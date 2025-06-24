import { Draggable } from '@hello-pangea/dnd';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import style from './FretChunk.module.scss';

const FretChunk = (props) => {
  const {
    chunk,
    fret,
    text,
    chunkIndex,
    fretIndex,
    noteIndex,
    isDragDisabled,
    isEditionDisabled,
    hasRightBorder,
    onOpenContextMenu,
    onEditFretChunkText,
  } = props;

  const [ editMode, setEditMode ] = useState(false);
  const [ editInputValue, setEditInputValue ] = useState(text);

  const onDoubleClickChunk = useCallback(() => {
    setEditMode(currentEditMode => !currentEditMode);
  }, []);

  const onKeyDownChunk = useCallback((event) => {
    if(event.key == 'Enter') {
      event.target.blur();
    } else if(event.key == 'Tab') {
      event.preventDefault();

      const fretToBeClickedIndex = event.shiftKey ? fretIndex - 1 : fretIndex + 1;
      const nextChunk = document.querySelector(`#fret-chunk-${fretToBeClickedIndex}-${chunkIndex}`);

      if(nextChunk) {
        nextChunk.dispatchEvent(new MouseEvent('dblclick', {
          'view': window,
          'bubbles': true,
          'cancelable': true,
        }));
      }
    }
  }, [ chunkIndex, fretIndex ]);

  useEffect(() => {
    setEditInputValue(text);
  }, [ text ]);

  const draggableId = useMemo(() => `fret-chunk-${fret.id}-${chunk.id}`, [ chunk.id, fret.id ]);

  return (
    <Draggable
      draggableId={draggableId}
      index={chunkIndex}
      isDragDisabled={isDragDisabled}>
      {(provided) => (
        <div
          id={draggableId}
          className={style.FretChunk}
          onContextMenu={(e) => {
            e.preventDefault();

            onOpenContextMenu({
              chunkIndex,
              fretIndex,
              top: e.pageY - window.scrollY,
              left: e.pageX - window.scrollX,
            });
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onDoubleClick={!isEditionDisabled ? onDoubleClickChunk : null}
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
                onKeyDown={onKeyDownChunk}
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

const FretChunkMemo = memo(FretChunk);

export { FretChunkMemo as FretChunk  };
