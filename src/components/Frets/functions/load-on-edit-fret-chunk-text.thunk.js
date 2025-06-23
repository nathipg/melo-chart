import { generateNewFret } from './generate-new-fret.function';
import { getStringQty } from './get-string-qty.function';

export const loadOnEditFretChunkText = (setFrets) => (params) => {
  const { text, fretIndex, chunkIndex } = params;
  
  const normalizedText = text.trim();

  const hasText = !!normalizedText;
  const hasSpaces = normalizedText.indexOf(' ') !== -1;

  const textArray = hasSpaces ? normalizedText.split(' ') : [ text ];

  setFrets((currentFrets) => {
    const stringsQty = getStringQty(currentFrets);
    const editedFret = currentFrets[fretIndex];

    const updatedChunks = editedFret.chunks.map((chunk, i) => {
      const isEditedChunk = i == chunkIndex;
      const otherChunksValue = hasText ? '' : chunk.text;

      return {
        ...chunk,
        text: isEditedChunk ? textArray[0] : otherChunksValue,
      };
    });

    const newFrets = textArray.length > 1 ?  textArray.slice(1).map(text => {
      const newFret = generateNewFret(stringsQty);
      newFret.chunks[chunkIndex].text = text;

      return newFret;
    }) : [];

    return [
      ...currentFrets.slice(0, fretIndex),
      {
        ...editedFret,
        chunks: updatedChunks,
      },
      ...newFrets,
      ...currentFrets.slice(fretIndex + 1),
    ];
  });
};
