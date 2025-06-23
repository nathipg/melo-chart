import { getStringQty } from './get-string-qty.function';

export const getNotesInString = (frets, index) => {
  return frets.reduce((acc, cur) => acc + cur.chunks[index].text, '');
};

export const trimStrings = (params) => {
  const { setFrets } = params;

  setFrets((curFrets) => {
    const fretsTrimmedTop = trimStringsTop(curFrets);
    const fretsTrimmed = trimStringsBottom(fretsTrimmedTop);

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

export const trimStringsBottom = (frets) => {
  const stringsQty = getStringQty(frets);
  let firstEmptyString = -1;

  for(let i = stringsQty - 1; i >= 0; i--) {
    const stringNotes = getNotesInString(frets, i);

    if(stringNotes) {
      break;
    }

    firstEmptyString = i;
  }

  if(firstEmptyString == -1) {
    return [ ...frets ];
  }

  return frets.map((fret) => {
    const updatedChunks = fret.chunks.map((chunk, i) => {
      return i >= firstEmptyString ? null : chunk;
    }).filter(Boolean);

    return {
      ...fret,
      chunks: updatedChunks,
    };
  });
};

export const trimStringsTop = (frets) => {
  const stringsQty = getStringQty(frets);
  let lastEmptyString = -1;

  for(let i = 0; i < stringsQty; i++) {
    const stringNotes = getNotesInString(frets, i);

    if(stringNotes) {
      break;
    }

    lastEmptyString = i;
  }

  if(lastEmptyString == -1) {
    return [ ...frets ];
  }

  return frets.map((fret) => {
    const updatedChunks = fret.chunks.map((chunk, i) => {
      return i > lastEmptyString ? chunk : null;
    }).filter(Boolean);

    return {
      ...fret,
      chunks: updatedChunks,
    };
  });
};
