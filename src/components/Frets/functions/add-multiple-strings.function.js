import { generateNewFretChunk } from './generate-new-fret-chunk.function';

export const addMultipleStrings = (params) => {
  const { qty, setFrets } = params;

  setFrets((curFrets) => {
    return curFrets.map(fret => {
      const updatedChunks = [
        ...fret.chunks,
        ...Array.from({ length: qty }, () => generateNewFretChunk()),
      ];
      
      return {
        ...fret,
        chunks: updatedChunks,
      };
    });
  });
};
