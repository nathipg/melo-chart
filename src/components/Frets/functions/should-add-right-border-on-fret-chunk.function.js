export const shouldAddRightBorderOnFretChunk = (chunkIndex, currentFretNoteIndex, nextFretNoteIndex) => {
  if(currentFretNoteIndex == -1 || nextFretNoteIndex == -1) {
    return false;
  }
  
  if(currentFretNoteIndex < nextFretNoteIndex) { // Next fret note is lower
    if(chunkIndex <= currentFretNoteIndex) {
      return false;
    }

    if(chunkIndex > nextFretNoteIndex) {
      return false;
    }

    return true;
  }

  if(chunkIndex == nextFretNoteIndex) { // Next fret note is the same
    return false;
  }

  // Next fret note is higher

  if(chunkIndex <= currentFretNoteIndex && chunkIndex > nextFretNoteIndex) {
    return true;
  }
};
