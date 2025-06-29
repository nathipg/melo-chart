import { addPitch } from './add-pitch.function';

export const addPitchAtFretBottom = (params) => {
  const { contextMenuData, setFrets } = params;
  const { chunkIndex } = contextMenuData;

  addPitch({
    chunkIndex: chunkIndex + 1,
    setFrets,
  });
};
