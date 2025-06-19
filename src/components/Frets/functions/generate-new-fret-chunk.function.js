import { nanoid } from 'nanoid';

export const generateNewFretChunk = () => {
  return {
    id: nanoid(),
    text: '',
  };
};
