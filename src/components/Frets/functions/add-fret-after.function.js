import { addFret } from './add-fret.function';

export const addFretAfter = (params) => {
  const { contextMenuData, setFrets } = params;
  const { fretIndex } = contextMenuData;

  addFret({
    fretIndex: fretIndex + 1,
    setFrets,
  });
};
