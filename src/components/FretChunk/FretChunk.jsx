import { Draggable } from '@hello-pangea/dnd';
import { useCallback, useEffect, useState } from 'react';

import style from './FretChunk.module.scss';

const FretChunk = (props) => {
  const { text, chunkIndex, fretIndex, hasRightBorder, onOpenContextMenu, onEditFretChunkText } = props;

  const noteIndex = (chunkIndex % 12) + 1;
  const isDragDisabled = !text || fretIndex == 0;

  const [editMode, setEditMode] = useState(false);
  const [editInputValue, setEditInputValue] = useState(text);

  const onDoubleClickChunk = useCallback(() => {
    setEditMode(currentEditMode => !currentEditMode);
  }, []);

  useEffect(() => {
    setEditInputValue(text);
  }, [text]);

  return (
    <Draggable
      draggableId={`fret-chunk-${fretIndex}-${chunkIndex}`}
      index={chunkIndex}
      isDragDisabled={isDragDisabled}>
      {(provided) => (
        <div
          className={style.FretChunk}
          onContextMenu={(e) => {
            e.preventDefault();
          
            onOpenContextMenu({
              chunkIndex,
              fretIndex,
              top: e.pageY,
              left: e.pageX,
            });
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onDoubleClick={onDoubleClickChunk}
          data-is-drag-disabled={isDragDisabled ? 'true' : 'false'}
          data-note-index={noteIndex}
          data-has-text={text ? 'true' : 'false'}
          data-has-right-border={hasRightBorder}
        >
          {
            editMode ?
              <input
                autoFocus
                type="text"
                name="fret-chunk-edit-input"
                value={editInputValue}
                onChange={(event) => setEditInputValue(event.target.value)}
                onBlur={() => {
                  setEditMode(false);
                  onEditFretChunkText({
                    text: editInputValue,
                    fretIndex,
                    chunkIndex,
                  });
                }}
              />
              : <span>{text}</span>
          }
        </div>
      )}
    </Draggable>
  );
};

export { FretChunk };
