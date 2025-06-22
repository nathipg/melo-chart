import { nanoid } from 'nanoid';

import { generateNewFret } from '../../Frets/functions/generate-new-fret.function';

export const generateNewSong = (title) => {
  return {
    id: nanoid(),
    title,
    frets: Array.from({ length: 10 }, () => generateNewFret(6)),
  };
};
