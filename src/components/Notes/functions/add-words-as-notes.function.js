import { breakLyrics } from '../../../utils';

import { generateNewNote } from './generate-new-note.function';
import { getPitchesQty } from './get-pitches-qty.function';

export const addWordsAsNotes = (params) => {
  const { setNotes, songText } = params;

  const allWords = breakLyrics(songText);

  setNotes((curNotes) => {
    const pitchesQty = getPitchesQty(curNotes);
    return [
      ...curNotes.slice(0, 1),
      ...allWords.map(word => {
        const note = generateNewNote(pitchesQty);
        note.chunks[0].text = word;

        return note;
      }),
    ];
  }, []);
};
