export const getPitchIndexInFret = (fret) => {
  return fret.chunks.findIndex(chunk => chunk.text);
};
