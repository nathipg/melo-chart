import { nanoid } from 'nanoid';

import { generateNewFretChunk } from './generate-new-fret-chunk.function';

export const generateNewFret = (stringsQty) => {
  const chunks = Array.from(
    { length: stringsQty },
    () => generateNewFretChunk(),
  );

  return {
    id: nanoid(),
    chunks,
  };
};
