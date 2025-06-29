import * as addSongSliceReducers from './add-song.reducers';
import * as saveSongSliceReducers from './save-song.reducers';

export const songSliceReducers = {
  ...addSongSliceReducers,
  ...saveSongSliceReducers,
};

