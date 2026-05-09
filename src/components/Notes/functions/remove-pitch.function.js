export const removePitch = (params) => {
  const { contextMenuData, setNotes } = params;
  const { chunkIndex } = contextMenuData;

  setNotes((currentNotes) => {
    return currentNotes.map((note) => {
      if(note.chunks.length === 1) {
        return {
          ...note,
        };
      }

      const updatedChunks = [
        ...note.chunks.slice(0, chunkIndex),
        ...note.chunks.slice(chunkIndex + 1),
      ];

      return {
        ...note,
        chunks: updatedChunks,
      };
    });
  });
};
