import { v7 as uuid } from 'uuid';

export const generateNewNoteChunk = () => {
  return {
    id: uuid(),
    text: '',
  };
};
