import { navigateToFretChunk } from './navigate-to-fret-chunk.function';

export const onEditChunkKeyDownTab = (data) => {
  const { event, fretIndex, chunkIndex } = data;

  event.preventDefault();

  const fretToBeClickedIndex = event.shiftKey ? fretIndex - 1 : fretIndex + 1;

  navigateToFretChunk({
    fretIndex: fretToBeClickedIndex,
    chunkIndex,
  });
};
