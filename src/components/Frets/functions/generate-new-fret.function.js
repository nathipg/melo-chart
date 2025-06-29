import { nanoid } from 'nanoid';

import { generateNewFretChunk } from './generate-new-fret-chunk.function';

export const generateNewFret = (pitchesQty) => {
  const chunks = Array.from(
    { length: pitchesQty },
    () => generateNewFretChunk(),
  );

  return {
    id: nanoid(),
    chunks,
  };
};
