export const getSongIndexById = (id, songs) => {
  return songs.findIndex((song) => song.id == id);
};
