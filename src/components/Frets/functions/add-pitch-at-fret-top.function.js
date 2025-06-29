import { addPitch } from './add-pitch.function';

export const addPitchAtFretTop = (params) => {
  const { contextMenuData, setFrets } = params;
  const { chunkIndex } = contextMenuData;

  addPitch({
    chunkIndex,
    setFrets,
  });
};
