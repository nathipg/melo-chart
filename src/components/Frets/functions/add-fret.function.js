import { generateNewFret } from './generate-new-fret.function';
import { getStringQty } from './get-string-qty.function';

export const addFret = (params) => {
  const { fretIndex, setFrets } = params;

  setFrets((currentFrets) => {
    return [
      ...currentFrets.slice(0, fretIndex),
      generateNewFret(getStringQty(currentFrets)),
      ...currentFrets.slice(fretIndex),
    ];
  });
};
