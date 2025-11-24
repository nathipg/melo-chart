import { useAbly, useChannel } from 'ably/react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from '@/components';
import { SOCKET_CHANNEL, SOCKET_EVENT_NAME_MAPPER } from '@/constants';

import { EDIT_CHUNK_KEY_DOWN_EVENT_FN_MAPPER } from './constants';
import { onDragOver } from './functions';

import style from './NoteChunk.module.scss';

const LS_DT_TEXT = 'drag-data-transfer-text';
const LS_DT_NOTE_INDEX = 'drag-data-transfer-note-index';
const LS_DT_CHUNK_INDEX = 'drag-data-transfer-chunk-index';

const NoteChunk = (props) => {
  const {
    chunk,
    note,
    text,
    chunkIndex,
    noteIndex,
    filledNoteIndex,
    hasRightBorder,
    isTheNoteDefinitionChunk = false,
    onOpenContextMenu,
    onEditNoteChunkText,
    onEditNoteDefinitionChunkText,
    songId,
    setChangesLog,
  } = props;

  const { t } = useTranslation();

  const ably = useAbly();

  const [ editMode, setEditMode ] = useState(false);
  const [ editInputValue, setEditInputValue ] = useState(text);

  const { publish } = useChannel(SOCKET_CHANNEL, (message) => {
    if(ably.connection.id != message.connectionId) {
      const { name, data } = message;
  
      if(data.id != songId) {
        return;
      }

      if(name == SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_CHANGES_LOG) {
        data.changesLog?.forEach(changeLog => {
          const { action, data } = changeLog;

          if(action == SOCKET_EVENT_NAME_MAPPER.UPDATE_NOTE_CHUNK_TEXT) {
            onBlur(data);
          }

          if(action == SOCKET_EVENT_NAME_MAPPER.UPDATE_NOTE_CHUNK_POSITION) {
            onEditNoteChunkText(data);
          }
        });
        return;
      }

      if(data.noteIndex != noteIndex || data.chunkIndex != chunkIndex) {
        return;
      }
  
      if(name == SOCKET_EVENT_NAME_MAPPER.UPDATE_NOTE_CHUNK_TEXT) {
        onBlur(data);
        return;
      }

      if(name == SOCKET_EVENT_NAME_MAPPER.UPDATE_NOTE_CHUNK_POSITION) {
        onEditNoteChunkText(data);
        return;
      }
    }
  });

  const isTheFirstChunk = useMemo(() => {
    return chunkIndex === 0;
  }, [ chunkIndex ]);

  const pitchIndex = useMemo(() => {
    return (chunkIndex % 12) + 1;
  }, [ chunkIndex ]);

  const isDragDisabled = useMemo(() => {
    return !text || isTheNoteDefinitionChunk;
  }, [ isTheNoteDefinitionChunk, text ]);

  const titleValue = useMemo(() => {
    return isTheNoteDefinitionChunk ? t('Click to define pitch') :  `${t('Click to define note')}. ${t('Drag the note to move it')}`;
  }, [ isTheNoteDefinitionChunk, t ]);

  const onClickChunk = useCallback(() => {
    setEditMode(currentEditMode => !currentEditMode);
  }, []);

  const onDropChunk = useCallback((event) => {
    event.preventDefault();

    const sourceNoteIndex = event.dataTransfer.getData('noteIndex');

    if(sourceNoteIndex != noteIndex) {
      return;
    }

    const sourceText = event.dataTransfer.getData('text');

    const data = {
      text: sourceText,
      noteIndex,
      chunkIndex,
    };

    onEditNoteChunkText(data);

    const publishData = {
      id: songId,
      ...data,
    };

    setChangesLog((currentChangesLog) => {
      return [
        ...currentChangesLog,
        {
          action: SOCKET_EVENT_NAME_MAPPER.UPDATE_NOTE_CHUNK_POSITION,
          data: publishData,
        },
      ];
    });

    publish(SOCKET_EVENT_NAME_MAPPER.UPDATE_NOTE_CHUNK_POSITION, publishData);
  }, [ chunkIndex, noteIndex, onEditNoteChunkText, publish, setChangesLog, songId ]);

  const onDragStart = useCallback((event) => {
    event.dataTransfer.setData('text', text);
    event.dataTransfer.setData('noteIndex', noteIndex);
  }, [ noteIndex, text ]);

  const onKeyDownChunk = useCallback((event) => {
    if(isTheNoteDefinitionChunk && [ 'Tab' ].includes(event.key)) {
      event.preventDefault();
      return;
    }

    const fn = EDIT_CHUNK_KEY_DOWN_EVENT_FN_MAPPER[event.key];

    fn && fn({
      event,
      chunkIndex,
      noteIndex,
      originalText: text,
      setEditInputValue,
    });
  }, [ chunkIndex, isTheNoteDefinitionChunk, noteIndex, text ]);

  const onBlur = useCallback((data) => {
    const onBlurFn = isTheNoteDefinitionChunk ? onEditNoteDefinitionChunkText : onEditNoteChunkText;
    onBlurFn(data);
  }, [ isTheNoteDefinitionChunk, onEditNoteChunkText, onEditNoteDefinitionChunkText ]);

  useEffect(() => {
    setEditInputValue(text);
  }, [ text ]);

  const draggableId = useMemo(() => `note-chunk-${note.id}-${chunk.id}`, [ chunk.id, note.id ]);

  const displayedText = useMemo(() => {
    const noteDefinitionText = text === '' ? t('Pitch') : text;
    const noteText = filledNoteIndex === -1 && text === '' ? t('Note') : text;
    const textToBeDisplayed = isTheNoteDefinitionChunk ? noteDefinitionText : noteText;

    return (
      <span className={`${style.ChunkText} ${!text ? style.EmptyChunkText : ''}`}>
        {textToBeDisplayed}
      </span>
    );
  }, [ filledNoteIndex, isTheNoteDefinitionChunk, t, text ]);

  // Drag n Drop Mobile
  const chunkRef = useRef(null);

  useEffect(() => {
    const chunkElement = chunkRef.current;

    const onTouchStart = () => {
      localStorage.setItem(LS_DT_TEXT, text);
      localStorage.setItem(LS_DT_NOTE_INDEX, noteIndex);
      localStorage.setItem(LS_DT_CHUNK_INDEX, chunkIndex);
    };

    const onTouchMove = (event) => {
      const sourceText = localStorage.getItem(LS_DT_TEXT);

      if (!sourceText) {
        return;
      }

      event.preventDefault();

      // Get current touch position and element
      const touch = event.touches[0];
      const elementBeenHovered = document.elementFromPoint(touch.clientX, touch.clientY);
      const dropZone = elementBeenHovered.closest(`.${style.NoteChunk}`);

      document
        .querySelectorAll(`.${style.HighlightDropZone}`)
        .forEach(chunk => chunk.classList.remove(style.HighlightDropZone));

      if (dropZone) {
        dropZone.classList.add(style.HighlightDropZone);
      }
    };

    const onTouchEnd = (event) => {
      const sourceText = localStorage.getItem(LS_DT_TEXT);
      const sourceNoteIndex = localStorage.getItem(LS_DT_NOTE_INDEX);
      const sourceChunkIndex = localStorage.getItem(LS_DT_CHUNK_INDEX);

      const touch = event.changedTouches[0];
      const elementBeenHovered = document.elementFromPoint(touch.clientX, touch.clientY);
      const dropZone = elementBeenHovered.closest(`.${style.NoteChunk}`);
      const currentChunkIndex = dropZone.dataset.chunkIndex;

      if (!sourceText) {
        return;
      }

      if(sourceNoteIndex != noteIndex) {
        return;
      }

      if(sourceChunkIndex == currentChunkIndex) {
        return;
      }

      event.preventDefault();

      localStorage.removeItem(LS_DT_TEXT);
      localStorage.removeItem(LS_DT_NOTE_INDEX);

      dropZone.classList.remove(style.HighlightDropZone);

      const data = {
        text: sourceText,
        noteIndex,
        chunkIndex: currentChunkIndex,
      };

      onEditNoteChunkText(data);

      const publishData = {
        id: songId,
        ...data,
      };

      setChangesLog((currentChangesLog) => {
        return [
          ...currentChangesLog,
          {
            action: SOCKET_EVENT_NAME_MAPPER.UPDATE_NOTE_CHUNK_POSITION,
            data: publishData,
          },
        ];
      });

      publish(SOCKET_EVENT_NAME_MAPPER.UPDATE_NOTE_CHUNK_POSITION, publishData);
    };
    
    chunkElement?.addEventListener('touchstart', onTouchStart, { passive: false });
    chunkElement?.addEventListener('touchmove', onTouchMove, { passive: false });
    chunkElement?.addEventListener('touchend', onTouchEnd, { passive: false });

    return () => {
      chunkElement?.removeEventListener('touchstart', onTouchStart, { passive: false });
      chunkElement?.removeEventListener('touchmove', onTouchMove, { passive: false });
      chunkElement?.removeEventListener('touchend', onTouchEnd, { passive: false });
    };
  }, [ chunkIndex, noteIndex, onEditNoteChunkText, publish, setChangesLog, songId, text ]);
  // END Drag n Drop Mobile

  return (
    <div
      id={draggableId}
      className={style.NoteChunk}
      ref={chunkRef}
      onContextMenu={(e) => {
        e.preventDefault();

        onOpenContextMenu({
          chunkIndex,
          noteIndex,
          top: e.pageY - window.scrollY,
          left: e.pageX - window.scrollX,
        });
      }}
      onClick={onClickChunk}
      draggable={!isDragDisabled}
      onDragStart={onDragStart}
      onDrop={onDropChunk}
      onDragOver={onDragOver}
      data-is-drag-disabled={isDragDisabled}
      data-pitch-index={pitchIndex}
      data-has-bottom-border={!!text || isTheNoteDefinitionChunk}
      data-has-right-border={hasRightBorder || isTheNoteDefinitionChunk}
      data-has-left-border={isTheNoteDefinitionChunk}
      data-has-top-border={isTheNoteDefinitionChunk && isTheFirstChunk}
      data-chunk-index={chunkIndex}
      data-note-index={noteIndex}
      title={titleValue}
    >
      {
        editMode ?
          <Input
            autoFocus
            type="text"
            name="note-chunk-edit-input"
            value={editInputValue}
            onKeyDown={onKeyDownChunk}
            onChange={(event) => setEditInputValue(event.target.value)}
            onBlur={() => {
              setEditMode(false);

              const data = {
                text: editInputValue,
                noteIndex,
                chunkIndex,
              };

              onBlur(data);

              const publishData = {
                id: songId,
                ...data,
              };

              setChangesLog((currentChangesLog) => {
                return [
                  ...currentChangesLog,
                  {
                    action: SOCKET_EVENT_NAME_MAPPER.UPDATE_NOTE_CHUNK_TEXT,
                    data: publishData,
                  },
                ];
              });

              publish(SOCKET_EVENT_NAME_MAPPER.UPDATE_NOTE_CHUNK_TEXT, publishData);
            }}
          />
          : displayedText
      }
    </div>
  );
};

const NoteChunkMemo = memo(NoteChunk);

export { NoteChunkMemo as NoteChunk  };
