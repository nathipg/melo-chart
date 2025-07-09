// Initial State
const initialState = {
  songs: [],
};

// Reducers
const reducers = {
  loadSongs: (state, action) => {
    state.songs = [ ...action.payload ].sort((a, b) => a.title.localeCompare(b.title));
  },
};

// Selectors
const selectors = {
  selectAllSongs: (state) => {
    return state.songs.songs;
  },
  selectSongById: (songId) => (state) => {
    return state.songs.songs.find(song => song.id === songId);
  },
  selectSongsError: (state) => {
    return state.songs.songsError;
  },
  selectSongsStatus: (state) => {
    return state.songs.songsStatus;
  },
};

export const LoadSongs = {
  initialState,
  reducers,
  selectors,
};
