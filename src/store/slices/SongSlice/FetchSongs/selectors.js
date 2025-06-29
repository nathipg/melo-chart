export const selectAllSongs = state => {
  return state.songs.songs;
};

export const selectSongById = songId => state => {
  return state.songs.songs.find(song => song.id === songId);
};

export const selectSongsError = state => {
  return state.songs.songsError;
};

export const selectSongsStatus = state => {
  return state.songs.songsStatus;
};
