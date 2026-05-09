import { getPitchesQty } from './get-pitches-qty.function';

export const getNotesInPitch = (notes, index) => {
  return notes.reduce((acc, cur) => acc + cur.chunks[index].text, '');
};

export const trimPitches = (params) => {
  const { setNotes } = params;

  setNotes((curNotes) => {
    const notesTrimmedTop = trimPitchesTop(curNotes);
    const notesTrimmed = trimPitchesBottom(notesTrimmedTop);

    if(!notesTrimmed[0].chunks.length) {
      return [
        ...curNotes,
      ];
    }

    return [
      ...notesTrimmed,
    ];
  });
};

export const trimPitchesBottom = (notes) => {
  const pitchesQty = getPitchesQty(notes);
  let firstEmptyPitch = -1;

  for(let i = pitchesQty - 1; i >= 0; i--) {
    const pitchNotes = getNotesInPitch(notes, i);

    if(pitchNotes) {
      break;
    }

    firstEmptyPitch = i;
  }

  if(firstEmptyPitch == -1) {
    return [ ...notes ];
  }

  return notes.map((note) => {
    const updatedChunks = note.chunks.map((chunk, i) => {
      return i >= firstEmptyPitch ? null : chunk;
    }).filter(Boolean);

    return {
      ...note,
      chunks: updatedChunks,
    };
  });
};

export const trimPitchesTop = (notes) => {
  const pitchesQty = getPitchesQty(notes);
  let lastEmptyPitch = -1;

  for(let i = 0; i < pitchesQty; i++) {
    const pitchNotes = getNotesInPitch(notes, i);

    if(pitchNotes) {
      break;
    }

    lastEmptyPitch = i;
  }

  if(lastEmptyPitch == -1) {
    return [ ...notes ];
  }

  return notes.map((note) => {
    const updatedChunks = note.chunks.map((chunk, i) => {
      return i > lastEmptyPitch ? chunk : null;
    }).filter(Boolean);

    return {
      ...note,
      chunks: updatedChunks,
    };
  });
};
