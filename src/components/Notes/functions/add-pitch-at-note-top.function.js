import { addPitch } from './add-pitch.function';

export const addPitchAtNoteTop = (params) => {
  const { contextMenuData, setNotes } = params;
  const { chunkIndex } = contextMenuData;

  addPitch({
    chunkIndex,
    setNotes,
  });
};
