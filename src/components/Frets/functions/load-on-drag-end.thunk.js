import { DRAG_TYPES } from '../../../constants';

import { getIndexFromDragId } from './get-index-from-drag-id.function';
import { moveFretChunk } from './move-fret-chunk.function';

export const loadOnDragEnd = (setFrets) => (dragData) => {
  const { destination, source } = dragData;

  if(DRAG_TYPES.CHUNKS_IN_FRET == dragData.type) {
    moveFretChunk({
      setFrets,
      source: {
        fretIndex: getIndexFromDragId(source.droppableId),
        chunkIndex: source.index,
      },
      destination: {
        fretIndex: getIndexFromDragId(destination.droppableId),
        chunkIndex: destination.index,
      },
    });
  }
};
