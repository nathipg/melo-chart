import { generateNewFret } from './generate-new-fret.function';
import { getPitchesQty } from './get-pitches-qty.function';

export const addWordsAsNotes = (params) => {
  const { setFrets, songText } = params;

  const allWords = songText.replaceAll('\n', ' ').trim().split(' ');

  setFrets((curFrets) => {
    const pitchesQty = getPitchesQty(curFrets);
    return [
      ...curFrets.slice(0, 1),
      ...allWords.map(word => {
        const fret = generateNewFret(pitchesQty);
        fret.chunks[0].text = word;

        return fret;
      }),
    ];
  }, []);
};
