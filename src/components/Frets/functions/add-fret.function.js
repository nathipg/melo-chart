import { generateNewFret } from './generate-new-fret.function';
import { getPitchesQty } from './get-pitches-qty.function';

export const addFret = (params) => {
  const { fretIndex, setFrets } = params;

  setFrets((currentFrets) => {
    return [
      ...currentFrets.slice(0, fretIndex),
      generateNewFret(getPitchesQty(currentFrets)),
      ...currentFrets.slice(fretIndex),
    ];
  });
};
