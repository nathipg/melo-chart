import { addNote } from './add-note.function';

export const addNoteAfter = (params) => {
  const { contextMenuData, setNotes } = params;
  const { noteIndex } = contextMenuData;

  addNote({
    noteIndex: noteIndex + 1,
    setNotes,
  });
};
