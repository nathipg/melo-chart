export const getIndexFromDragId = (dragId) => {
  const splitDragId = dragId.split('-');
  return +splitDragId[splitDragId.length - 1];
};
