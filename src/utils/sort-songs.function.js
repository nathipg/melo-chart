export const alphabeticallySortSongs = (songs) => {
  if(!Array.isArray(songs)) {
    throw new Error('alphabeticallySortSongs: songs should be an array');
  }

  return [ ...songs ].sort((a, b) => {
    const titleA = a.title || '';
    const titleB = b.title || '';

    return titleA.localeCompare(titleB);
  });
};
