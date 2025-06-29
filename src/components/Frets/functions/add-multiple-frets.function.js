import { generateNewFret } from './generate-new-fret.function';
import { getPitchesQty } from './get-pitches-qty.function';

export const addMultipleFrets = (params) => {
  const { qty, setFrets } = params;

  setFrets((curFrets) => {
    return [
      ...curFrets,
      ...Array.from({ length: qty }, () => generateNewFret(getPitchesQty(curFrets))),
    ];
  });
};
