import { addFret } from './add-fret.function';

export const addFretBefore = (params) => {
  const { contextMenuData, setFrets } = params;
  const { fretIndex } = contextMenuData;

  addFret({
    fretIndex,
    setFrets,
  });
};
