import { addPitch } from './add-pitch.function';

export const addPitchAtNoteBottom = (params) => {
  const { contextMenuData, setNotes } = params;
  const { chunkIndex } = contextMenuData;

  addPitch({
    chunkIndex: chunkIndex + 1,
    setNotes,
  });
};
