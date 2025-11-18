import { generateNewNote } from './generate-new-note.function';
import { getPitchesQty } from './get-pitches-qty.function';

export const addMultipleNotes = (params) => {
  const { qty, setNotes } = params;

  setNotes((curNotes) => {
    return [
      ...curNotes,
      ...Array.from({ length: qty }, () => generateNewNote(getPitchesQty(curNotes))),
    ];
  });
};
