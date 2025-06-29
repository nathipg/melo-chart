export const removeEmptyNotesAtTheEnd = (params) => {
  const { setNotes } = params;

  setNotes((curNotes) => {
    let lastIndexNull = -1;

    for(let i = curNotes.length - 1; i >= 0; i--) {
      const flatNote = curNotes[i].chunks.reduce((acc, cur) => acc  + cur.text, '');

      if(flatNote) {
        break;
      }

      lastIndexNull = i;
    }

    const updatedNotes = lastIndexNull != -1 ? curNotes.slice(0, lastIndexNull) : [ ...curNotes ];

    if(!updatedNotes.length) {
      return [
        ...curNotes,
      ];
    }

    return [
      ...updatedNotes,
    ];
  });
};
