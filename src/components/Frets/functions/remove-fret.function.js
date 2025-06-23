export const removeFret = (params) => {
  const { contextMenuData, setFrets } = params;
  const { fretIndex } = contextMenuData;

  setFrets((currentFrets) => {
    if(fretIndex === 0) {
      return [ ...currentFrets ];
    }

    return [
      ...currentFrets.slice(0, fretIndex),
      ...currentFrets.slice(fretIndex + 1),
    ];
  });
};
