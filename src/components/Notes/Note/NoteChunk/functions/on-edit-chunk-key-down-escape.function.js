export const onEditChunkKeyDownEscape = (data) => {
  const { event, originalText, setEditInputValue } = data;

  setEditInputValue(originalText);

  setTimeout(() => {
    event.target.blur();
  }, 0);
};
