import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EDIT_CHUNK_KEY_DOWN_EVENT_FN_MAPPER } from './constants';
import { onDragOver } from './functions';

import style from './NoteChunk.module.scss';

const NoteChunk = (props) => {
  const {
    chunk,
    note,
    text,
    chunkIndex,
    noteIndex,
    filledNoteIndex,
    hasRightBorder,
    onOpenContextMenu,
    onEditNoteChunkText,
    onEditNoteDefinitionChunkText,
  } = props;

  const { t } = useTranslation();

  const [ editMode, setEditMode ] = useState(false);
  const [ editInputValue, setEditInputValue ] = useState(text);

  const isTheNoteDefinitionChunk = useMemo(() => {
    return noteIndex === 0;
  }, [ noteIndex ]);

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
    return isTheNoteDefinitionChunk ? t('Double click to define pitch') :  t('Double click to define note');
  }, [ isTheNoteDefinitionChunk, t ]);

  const onDoubleClickChunk = useCallback(() => {
    setEditMode(currentEditMode => !currentEditMode);
  }, []);

  const onDropChunk = useCallback((event) => {
    event.preventDefault();

    const sourceNoteIndex = event.dataTransfer.getData('noteIndex');

    if(sourceNoteIndex != noteIndex) {
      return;
    }

    const sourceText = event.dataTransfer.getData('text');

    onEditNoteChunkText({
      text: sourceText,
      noteIndex,
      chunkIndex,
    });
  }, [ chunkIndex, noteIndex, onEditNoteChunkText ]);

  const onDragStart = useCallback((event) => {
    event.dataTransfer.setData('text', text);
    event.dataTransfer.setData('noteIndex', noteIndex);
  }, [ noteIndex, text ]);

  const onKeyDownChunk = useCallback((event) => {
    const fn = EDIT_CHUNK_KEY_DOWN_EVENT_FN_MAPPER[event.key];

    fn && fn({
      event,
      chunkIndex,
      noteIndex,
      originalText: text,
      setEditInputValue,
    });
  }, [ chunkIndex, noteIndex, text ]);

  useEffect(() => {
    setEditInputValue(text);
  }, [ text ]);

  const draggableId = useMemo(() => `note-chunk-${note.id}-${chunk.id}`, [ chunk.id, note.id ]);

  const displayedText = useMemo(() => {
    const noteDefinitionText = text === '' ? t('Pitch') : text;
    const noteText = filledNoteIndex === -1 && text === '' ? t('Note') : text;
    const textToBeDisplayed = isTheNoteDefinitionChunk ? noteDefinitionText : noteText;

    return (
      <span className={!text ? style.EmptyChunkText : null}>
        {textToBeDisplayed}
      </span>
    );
  }, [ filledNoteIndex, isTheNoteDefinitionChunk, t, text ]);

  return (
    <div
      id={draggableId}
      className={style.NoteChunk}
      onContextMenu={(e) => {
        e.preventDefault();

        onOpenContextMenu({
          chunkIndex,
          noteIndex,
          top: e.pageY - window.scrollY,
          left: e.pageX - window.scrollX,
        });
      }}
      onDoubleClick={onDoubleClickChunk}
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
          <input
            autoFocus
            type="text"
            name="note-chunk-edit-input"
            value={editInputValue}
            onKeyDown={onKeyDownChunk}
            onChange={(event) => setEditInputValue(event.target.value)}
            onBlur={() => {
              setEditMode(false);

              const onBlurFn = isTheNoteDefinitionChunk ? onEditNoteDefinitionChunkText : onEditNoteChunkText;

              onBlurFn({
                text: editInputValue,
                noteIndex,
                chunkIndex,
              });
            }}
          />
          : displayedText
      }
    </div>
  );
};

const NoteChunkMemo = memo(NoteChunk);

export { NoteChunkMemo as NoteChunk  };
