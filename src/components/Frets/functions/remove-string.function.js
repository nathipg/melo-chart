export const removeString = (params) => {
  const { contextMenuData, setFrets } = params;
  const { chunkIndex } = contextMenuData;

  setFrets((currentFrets) => {
    return currentFrets.map((fret) => {
      if(fret.chunks.length === 1) {
        return {
          ...fret,
        };
      }

      const updatedChunks = [
        ...fret.chunks.slice(0, chunkIndex),
        ...fret.chunks.slice(chunkIndex + 1),
      ];

      return {
        ...fret,
        chunks: updatedChunks,
      };
    });
  });
};
