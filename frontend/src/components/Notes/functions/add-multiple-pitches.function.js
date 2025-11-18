import { generateNewNoteChunk } from './generate-new-note-chunk.function';

export const addMultiplePitches = (params) => {
  const { qty, setNotes } = params;

  setNotes((curNotes) => {
    return curNotes.map(note => {
      const updatedChunks = [
        ...note.chunks,
        ...Array.from({ length: qty }, () => generateNewNoteChunk()),
      ];
      
      return {
        ...note,
        chunks: updatedChunks,
      };
    });
  });
};
