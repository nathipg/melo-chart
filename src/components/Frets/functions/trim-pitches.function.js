import { getPitchesQty } from './get-pitches-qty.function';

export const getNotesInPitch = (frets, index) => {
  return frets.reduce((acc, cur) => acc + cur.chunks[index].text, '');
};

export const trimPitches = (params) => {
  const { setFrets } = params;

  setFrets((curFrets) => {
    const fretsTrimmedTop = trimPitchesTop(curFrets);
    const fretsTrimmed = trimPitchesBottom(fretsTrimmedTop);

    if(!fretsTrimmed[0].chunks.length) {
      return [
        ...curFrets,
      ];
    }

    return [
      ...fretsTrimmed,
    ];
  });
};

export const trimPitchesBottom = (frets) => {
  const pitchesQty = getPitchesQty(frets);
  let firstEmptyPitch = -1;

  for(let i = pitchesQty - 1; i >= 0; i--) {
    const pitchNotes = getNotesInPitch(frets, i);

    if(pitchNotes) {
      break;
    }

    firstEmptyPitch = i;
  }

  if(firstEmptyPitch == -1) {
    return [ ...frets ];
  }

  return frets.map((fret) => {
    const updatedChunks = fret.chunks.map((chunk, i) => {
      return i >= firstEmptyPitch ? null : chunk;
    }).filter(Boolean);

    return {
      ...fret,
      chunks: updatedChunks,
    };
  });
};

export const trimPitchesTop = (frets) => {
  const pitchesQty = getPitchesQty(frets);
  let lastEmptyPitch = -1;

  for(let i = 0; i < pitchesQty; i++) {
    const pitchNotes = getNotesInPitch(frets, i);

    if(pitchNotes) {
      break;
    }

    lastEmptyPitch = i;
  }

  if(lastEmptyPitch == -1) {
    return [ ...frets ];
  }

  return frets.map((fret) => {
    const updatedChunks = fret.chunks.map((chunk, i) => {
      return i > lastEmptyPitch ? chunk : null;
    }).filter(Boolean);

    return {
      ...fret,
      chunks: updatedChunks,
    };
  });
};
