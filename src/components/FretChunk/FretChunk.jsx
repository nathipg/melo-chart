import { Draggable } from '@hello-pangea/dnd';

import style from './FretChunk.module.scss';

const FretChunk = (props) => {
  const { text, chunkIndex, fretIndex, hasRightBorder, onOpenContextMenu } = props;

  const noteIndex = (chunkIndex % 12) + 1;

  return (
    <Draggable
      draggableId={`fret-chunk-${fretIndex}-${chunkIndex}`}
      index={chunkIndex}
      isDragDisabled={!text || fretIndex == 0}>
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
          data-note-index={noteIndex}
          data-has-text={text ? 'true' : 'false'}
          data-has-right-border={hasRightBorder}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </div>
      )}
    </Draggable>
  );
};

export { FretChunk };
