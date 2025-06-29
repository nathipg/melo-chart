import { nanoid } from 'nanoid';

import { generateNewNote } from '../../Notes/functions/generate-new-note.function';

export const generateNewSong = (title) => {
  return {
    id: nanoid(),
    title,
    notes: Array.from({ length: 10 }, () => generateNewNote(6)),
  };
};
