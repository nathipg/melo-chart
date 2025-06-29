import { navigateToNoteChunk } from './navigate-to-note-chunk.function';

export const onEditChunkKeyDownTab = (data) => {
  const { event, noteIndex, chunkIndex } = data;

  event.preventDefault();

  const noteToBeClickedIndex = event.shiftKey ? noteIndex - 1 : noteIndex + 1;

  navigateToNoteChunk({
    noteIndex: noteToBeClickedIndex,
    chunkIndex,
  });
};
