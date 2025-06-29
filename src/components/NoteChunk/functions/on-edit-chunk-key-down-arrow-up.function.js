import { navigateToNoteChunk } from './navigate-to-note-chunk.function';

export const onEditChunkKeyDownArrowUp = (data) => {
  const { event, noteIndex, chunkIndex } = data;

  event.preventDefault();

  navigateToNoteChunk({
    noteIndex,
    chunkIndex: chunkIndex - 1,
  });
};
