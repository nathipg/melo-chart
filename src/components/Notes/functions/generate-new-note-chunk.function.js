import { nanoid } from 'nanoid';

export const generateNewNoteChunk = () => {
  return {
    id: nanoid(),
    text: '',
  };
};
