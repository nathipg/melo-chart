export const moveFretChunk = (params) => {
  const { setFrets, source, destination } = params;

  if(source.fretId == destination.fretId && source.chunkIndex == destination.chunkIndex) {
    return;
  }

  setFrets((currentFrets) => {
    const sourceFretId = currentFrets.findIndex(fret => fret.id == source.fretId);
    const destinationFretId = source.fretId == destination.fretId ? sourceFretId : currentFrets.findIndex(fret => fret.id == destination.fretId);
    const destinationIndex = destinationFretId < sourceFretId ? destinationFretId + 1 : destinationFretId;

    const sourceFret = currentFrets[sourceFretId];
    const chunks = [ ...sourceFret.chunks ];
    const chunk = chunks.splice(source.chunkIndex, 1)[0];
    chunks.splice(destination.chunkIndex, 0, chunk);

    const fretsWithoutDragged = [
      ...currentFrets.slice(0, sourceFretId),
      ...currentFrets.slice(sourceFretId + 1),
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
