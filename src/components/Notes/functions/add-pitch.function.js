import { generateNewNoteChunk } from './generate-new-note-chunk.function';

export const addPitch = (params) => {
  const { chunkIndex, setNotes } = params;

  setNotes((currentNotes) => {
    return currentNotes.map(note => {
      const updatedChunks = [
        ...note.chunks.slice(0, chunkIndex),
        generateNewNoteChunk(),
        ...note.chunks.slice(chunkIndex),
      ];

      return {
        ...note,
        chunks: updatedChunks,
      };
    });
  });
};
