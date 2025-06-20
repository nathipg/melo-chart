export const moveFretChunk = (params) => {
  const { setFrets, source, destination } = params;

  if(source.fretIndex == destination.fretIndex && source.chunkIndex == destination.chunkIndex) {
    return;
  }

  const destinationIndex = destination.fretIndex < source.fretIndex ? destination.fretIndex + 1 : destination.fretIndex;

  setFrets((currentFrets) => {
    const sourceFret = currentFrets[source.fretIndex];
    const chunks = [ ...sourceFret.chunks ];
    const chunk = chunks.splice(source.chunkIndex, 1)[0];
    chunks.splice(destination.chunkIndex, 0, chunk);

    const fretsWithoutDragged = [
      ...currentFrets.slice(0, source.fretIndex),
      ...currentFrets.slice(source.fretIndex + 1),
    ];

    const updatedFrets = [
      ...fretsWithoutDragged.slice(0, destinationIndex),
      {
        ...sourceFret,
        chunks: [ ...chunks ],
      },
      ...fretsWithoutDragged.slice(destinationIndex),
    ];

    return updatedFrets;
  });
};
