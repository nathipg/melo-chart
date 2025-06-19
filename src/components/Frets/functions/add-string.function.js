import { generateNewFretChunk } from './generate-new-fret-chunk.function';

export const addString = (params) => {
  const { chunkIndex, setFrets } = params;

  setFrets((currentFrets) => {
    return currentFrets.map(fret => {
      const updatedChunks = [
        ...fret.chunks.slice(0, chunkIndex),
        generateNewFretChunk(),
        ...fret.chunks.slice(chunkIndex),
      ];

      return {
        ...fret,
        chunks: updatedChunks,
      };
    });
  });
};
