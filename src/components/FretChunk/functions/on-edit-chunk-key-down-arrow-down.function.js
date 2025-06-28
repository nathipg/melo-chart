import { navigateToFretChunk } from './navigate-to-fret-chunk.function';

export const onEditChunkKeyDownArrowDown = (data) => {
  const { event, fretIndex, chunkIndex } = data;

  event.preventDefault();

  navigateToFretChunk({
    fretIndex,
    chunkIndex: chunkIndex + 1,
  });
};
