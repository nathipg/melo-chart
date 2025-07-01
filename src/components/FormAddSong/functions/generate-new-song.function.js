import { v7 as uuid } from 'uuid';

import { generateNewNote } from '../../Notes/functions/generate-new-note.function';

export const generateNewSong = (title) => {
  return {
    id: uuid(),
    title,
    isNewSong: true,
    notes: Array.from({ length: 10 }, () => generateNewNote(6)),
  };
};
