import { memo, useCallback, useEffect, useMemo, useState } from 'react';

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
    pitchIndex,
    isDragDisabled,
    isEditionDisabled,
    hasRightBorder,
    onOpenContextMenu,
    onEditNoteChunkText,
  } = props;

  const [ editMode, setEditMode ] = useState(false);
  const [ editInputValue, setEditInputValue ] = useState(text);

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
      onDoubleClick={!isEditionDisabled ? onDoubleClickChunk : null}
      draggable={isDragDisabled ? 'false' : 'true'}
      onDragStart={onDragStart}
      onDrop={onDropChunk}
      onDragOver={onDragOver}
      data-is-drag-disabled={isDragDisabled ? 'true' : 'false'}
      data-pitch-index={pitchIndex}
      data-has-text={text ? 'true' : 'false'}
      data-has-right-border={hasRightBorder}
      data-chunk-index={chunkIndex}
      data-note-index={noteIndex}
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
              onEditNoteChunkText({
                text: editInputValue,
                noteIndex,
                chunkIndex,
              });
            }}
          />
          : <span>{text}</span>
      }
    </div>
  );
};

const NoteChunkMemo = memo(NoteChunk);

export { NoteChunkMemo as NoteChunk  };
