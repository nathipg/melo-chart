import { addString } from './add-string.function';

export const addStringAtFretBottom = (params) => {
  const { contextMenuData, setFrets } = params;
  const { chunkIndex } = contextMenuData;

  addString({
    chunkIndex: chunkIndex + 1,
    setFrets,
  });
};
