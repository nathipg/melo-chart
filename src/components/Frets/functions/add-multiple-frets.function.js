import { generateNewFret } from './generate-new-fret.function';
import { getStringQty } from './get-string-qty.function';

export const addMultipleFrets = (params) => {
  const { qty, setFrets } = params;

  setFrets((curFrets) => {
    return [
      ...curFrets,
      ...Array.from({ length: qty }, () => generateNewFret(getStringQty(curFrets))),
    ];
  });
};
