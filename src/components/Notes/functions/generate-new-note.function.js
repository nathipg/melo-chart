import { v7 as uuid } from 'uuid';

import { generateNewNoteChunk } from './generate-new-note-chunk.function';

export const generateNewNote = (pitchesQty) => {
  const chunks = Array.from(
    { length: pitchesQty },
    () => generateNewNoteChunk(),
  );

  return {
    id: uuid(),
    chunks,
  };
};
