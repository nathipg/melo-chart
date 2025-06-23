export const removeEmptyFretsAtTheEnd = (params) => {
  const { setFrets } = params;

  setFrets((curFrets) => {
    let lastIndexNull = -1;

    for(let i = curFrets.length - 1; i >= 0; i--) {
      const flatFret = curFrets[i].chunks.reduce((acc, cur) => acc  + cur.text, '');

      if(flatFret) {
        break;
      }

      lastIndexNull = i;
    }

    const updatedFrets = curFrets.slice(0, lastIndexNull);

    if(!updatedFrets.length) {
      return [
        ...curFrets,
      ];
    }

    return [
      ...updatedFrets,
    ];
  });
};
