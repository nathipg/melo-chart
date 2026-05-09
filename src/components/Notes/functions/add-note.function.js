import { generateNewNote } from './generate-new-note.function';
import { getPitchesQty } from './get-pitches-qty.function';

export const addNote = (params) => {
  const { noteIndex, setNotes } = params;

  setNotes((currentNotes) => {
    return [
      ...currentNotes.slice(0, noteIndex),
      generateNewNote(getPitchesQty(currentNotes)),
      ...currentNotes.slice(noteIndex),
    ];
  });
};
