export const getNoteIndexInFret = (fret) => {
  return fret.chunks.findIndex(chunk => chunk.text);
};
