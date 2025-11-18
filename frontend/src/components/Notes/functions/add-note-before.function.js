import { addNote } from './add-note.function';

export const addNoteBefore = (params) => {
  const { contextMenuData, setNotes } = params;
  const { noteIndex } = contextMenuData;

  addNote({
    noteIndex,
    setNotes,
  });
};
