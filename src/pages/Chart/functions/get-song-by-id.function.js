export const getSongById = (id, songs) => {
  return songs.find((song) => song.id == id);
};
