import { DRAG_TYPES } from '../../../constants';

import { moveFretChunk } from './move-fret-chunk.function';

export const loadOnDragEnd = (setFrets) => (dragData) => {
  const { destination, source } = dragData;

  if(DRAG_TYPES.CHUNKS_IN_FRET == dragData.type) {
    moveFretChunk({
      setFrets,
      source: {
        fretId: source.droppableId.replace('fret-', ''),
        chunkIndex: source.index,
      },
      destination: {
        fretId: destination.droppableId.replace('fret-', ''),
        chunkIndex: destination.index,
      },
    });
  }
};
