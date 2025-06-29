import * as addSongSliceReducers from './add-song.reducers';
import * as deleteSongSliceReducers from './delete-song.reducers';
import * as saveSongSliceReducers from './save-song.reducers';

export const songSliceReducers = {
  ...addSongSliceReducers,
  ...saveSongSliceReducers,
  ...deleteSongSliceReducers,
};

