export const navigateToFretChunk = (data) => {
  const { fretIndex, chunkIndex } = data;

  const nextChunk = document.querySelector(`[data-fret-index="${fretIndex}"][data-chunk-index="${chunkIndex}"]`);

  if(nextChunk) {
    nextChunk.dispatchEvent(new MouseEvent('dblclick', {
      'view': window,
      'bubbles': true,
      'cancelable': true,
    }));
  }
};
