import { REQUEST_STATUS } from '../../../../constants';
import { songSliceAsyncThunks } from '../async-thunks';

export const addFetchSongsCases = (builder) => {
  builder
    .addCase(songSliceAsyncThunks.fetchSongs.pending, (state) => {
      state.songsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(songSliceAsyncThunks.fetchSongs.fulfilled, (state, action) => {
      state.songsStatus = REQUEST_STATUS.SUCCEEDED;
      state.songs = action.payload;
    })
    .addCase(songSliceAsyncThunks.fetchSongs.rejected, (state, action) => {
      state.songsStatus = REQUEST_STATUS.FAILED;
      state.songsError = action.error.message;
    })
  ;
};
