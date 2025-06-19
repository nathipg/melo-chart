import { addString } from './add-string.function';

export const addStringAtFretTop = (params) => {
  const { contextMenuData, setFrets } = params;
  const { chunkIndex } = contextMenuData;

  addString({
    chunkIndex,
    setFrets,
  });
};
