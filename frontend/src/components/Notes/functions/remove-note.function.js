export const removeNote = (params) => {
  const { contextMenuData, setNotes } = params;
  const { noteIndex } = contextMenuData;

  setNotes((currentNotes) => {
    if(noteIndex === 0) {
      return [ ...currentNotes ];
    }

    return [
      ...currentNotes.slice(0, noteIndex),
      ...currentNotes.slice(noteIndex + 1),
    ];
  });
};
