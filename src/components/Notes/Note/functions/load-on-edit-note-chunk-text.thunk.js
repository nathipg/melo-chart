import { generateNewNote, getPitchesQty } from '../../functions';

export const loadOnEditNoteChunkText = (setNotes) => (params) => {
  const { text, noteIndex, chunkIndex } = params;
  
  const normalizedText = text.trim();

  const hasText = !!normalizedText;
  const hasSpaces = normalizedText.indexOf(' ') !== -1;

  const textArray = hasSpaces ? normalizedText.split(' ') : [ text ];

  setNotes((currentNotes) => {
    const pitchesQty = getPitchesQty(currentNotes);
    const editedNote = currentNotes[noteIndex];

    const updatedChunks = editedNote.chunks.map((chunk, i) => {
      const isEditedChunk = i == chunkIndex;
      const otherChunksValue = hasText ? '' : chunk.text;

      return {
        ...chunk,
        text: isEditedChunk ? textArray[0] : otherChunksValue,
      };
    });

    const newNotes = textArray.length > 1 ?  textArray.slice(1).map(text => {
      const newNote = generateNewNote(pitchesQty);
      newNote.chunks[chunkIndex].text = text;

      return newNote;
    }) : [];

    return [
      ...currentNotes.slice(0, noteIndex),
      {
        ...editedNote,
        chunks: updatedChunks,
      },
      ...newNotes,
      ...currentNotes.slice(noteIndex + 1),
    ];
  });
};
