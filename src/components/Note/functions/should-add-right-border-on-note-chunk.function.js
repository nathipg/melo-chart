export const shouldAddRightBorderOnNoteChunk = (chunkIndex, currentNoteNoteIndex, nextNoteNoteIndex) => {
  if(currentNoteNoteIndex == -1 || nextNoteNoteIndex == -1) {
    return false;
  }
  
  if(currentNoteNoteIndex < nextNoteNoteIndex) { // Next note note is lower
    if(chunkIndex <= currentNoteNoteIndex) {
      return false;
    }

    if(chunkIndex > nextNoteNoteIndex) {
      return false;
    }

    return true;
  }

  if(chunkIndex == nextNoteNoteIndex) { // Next note note is the same
    return false;
  }

  // Next note note is higher

  if(chunkIndex <= currentNoteNoteIndex && chunkIndex > nextNoteNoteIndex) {
    return true;
  }
};
