export const selectAddSongError = state => state.songs.addSongError;
export const selectAddSongStatus = state => state.songs.addSongStatus;
export const selectAllSongs = state => state.songs.songs;
export const selectSaveSongError = state => state.songs.saveSongError;
export const selectSaveSongStatus = state => state.songs.saveSongStatus;
export const selectSongById = songId => state => state.songs.songs.find(song => song.id === songId);
export const selectSongsError = state => state.songs.songsError;
export const selectSongsStatus = state => state.songs.songsStatus;
