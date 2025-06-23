import { generateNewFret } from './generate-new-fret.function';
import { getStringQty } from './get-string-qty.function';

export const addWordsAsNotes = (params) => {
  const { setFrets, songText } = params;

  const allWords = songText.replaceAll('\n', ' ').trim().split(' ');

  setFrets((curFrets) => {
    const stringsQty = getStringQty(curFrets);
    return [
      ...curFrets.slice(0, 1),
      ...allWords.map(word => {
        const fret = generateNewFret(stringsQty);
        fret.chunks[0].text = word;

        return fret;
      }),
    ];
  }, []);
};
