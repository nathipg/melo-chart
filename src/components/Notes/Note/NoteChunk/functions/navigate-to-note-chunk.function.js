export const navigateToNoteChunk = (data) => {
  const { noteIndex, chunkIndex } = data;

  const nextChunk = document.querySelector(`[data-note-index="${noteIndex}"][data-chunk-index="${chunkIndex}"]`);

  if(nextChunk) {
    nextChunk.dispatchEvent(new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true,
    }));
  }
};
