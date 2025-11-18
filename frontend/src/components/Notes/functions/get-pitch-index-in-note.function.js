export const getPitchIndexInNote = (note) => {
  return note.chunks.findIndex(chunk => chunk.text);
};
