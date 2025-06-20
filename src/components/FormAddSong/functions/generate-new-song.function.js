import { nanoid } from 'nanoid';

export const generateNewSong = (title) => {
  return {
    id: nanoid(),
    title,
    frets: [
      {
        id: nanoid(),
        chunks: [
          { id: nanoid(), text: '' },
          { id: nanoid(), text: '' },
          { id: nanoid(), text: '' },
          { id: nanoid(), text: '' },
          { id: nanoid(), text: '' },
        ],
      },
    ],
  };
};
