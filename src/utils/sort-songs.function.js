export const alphabeticallySortSongs = (songs) => {
  return [ ...songs ].sort((a, b) => a.title.localeCompare(b.title));
};
