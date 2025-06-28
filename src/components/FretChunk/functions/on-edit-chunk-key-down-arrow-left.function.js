import { navigateToFretChunk } from './navigate-to-fret-chunk.function';

export const onEditChunkKeyDownArrowLeft = (data) => {
  const { fretIndex, chunkIndex } = data;

  navigateToFretChunk({
    fretIndex: fretIndex - 1,
    chunkIndex,
  });
};
