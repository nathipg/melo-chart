import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { EDIT_CHUNK_KEY_DOWN_EVENT_FN_MAPPER } from './constants';
import { onDragOver } from './functions';

import style from './FretChunk.module.scss';

const FretChunk = (props) => {
  const {
    chunk,
    fret,
    text,
    chunkIndex,
    fretIndex,
    pitchIndex,
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

  const onDropChunk = useCallback((event) => {
    event.preventDefault();

    const sourceFretIndex = event.dataTransfer.getData('fretIndex');

    if(sourceFretIndex != fretIndex) {
      return;
    }

    const sourceText = event.dataTransfer.getData('text');

    onEditFretChunkText({
      text: sourceText,
      fretIndex,
      chunkIndex,
    });
  }, [ chunkIndex, fretIndex, onEditFretChunkText ]);

  const onDragStart = useCallback((event) => {
    event.dataTransfer.setData('text', text);
    event.dataTransfer.setData('fretIndex', fretIndex);
  }, [ fretIndex, text ]);

  const onKeyDownChunk = useCallback((event) => {
    const fn = EDIT_CHUNK_KEY_DOWN_EVENT_FN_MAPPER[event.key];

    fn && fn({
      event,
      chunkIndex,
      fretIndex,
      originalText: text,
      setEditInputValue,
    });
  }, [ chunkIndex, fretIndex, text ]);

  useEffect(() => {
    setEditInputValue(text);
  }, [ text ]);

  const draggableId = useMemo(() => `fret-chunk-${fret.id}-${chunk.id}`, [ chunk.id, fret.id ]);

  return (
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
      data-fret-index={fretIndex}
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
  );
};

const FretChunkMemo = memo(FretChunk);

export { FretChunkMemo as FretChunk  };
