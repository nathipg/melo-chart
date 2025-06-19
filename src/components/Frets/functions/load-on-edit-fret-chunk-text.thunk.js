export const loadOnEditFretChunkText = (setFrets) => (params) => {
  const { text, fretIndex, chunkIndex } = params;
  
  const normalizedText = text.trim();

  const hasText = !!normalizedText;

  setFrets((currentFrets) => {
    const editedFret = currentFrets[fretIndex];

    const updatedChunks = editedFret.chunks.map((chunk, i) => {
      const isEditedChunk = i == chunkIndex;
      const otherChunksValue = hasText ? '' : chunk.text;

      return {
        ...chunk,
        text: isEditedChunk ? normalizedText : otherChunksValue,
      };
    });

    return [
      ...currentFrets.slice(0, fretIndex),
      {
        ...editedFret,
        chunks: updatedChunks,
      },
      ...currentFrets.slice(fretIndex + 1),
    ];
  });
};
