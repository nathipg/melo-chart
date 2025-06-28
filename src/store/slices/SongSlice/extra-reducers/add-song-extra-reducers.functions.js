import { REQUEST_STATUS } from '../../../../constants';
import { songSliceAsyncThunks } from '../async-thunks';

export const addAddSongCases = (builder) => {
  builder
    .addCase(songSliceAsyncThunks.addSong.pending, (state) => {
      state.addSongStatus = REQUEST_STATUS.LOADING;
      state.addSongError = null;
    })
    .addCase(songSliceAsyncThunks.addSong.fulfilled, (state, action) => {
      state.addSongStatus = REQUEST_STATUS.SUCCEEDED;
      state.songs.push(action.payload);
    })
    .addCase(songSliceAsyncThunks.addSong.rejected, (state, action) => {
      state.addSongStatus = REQUEST_STATUS.FAILED;
      state.addSongError = action.error.message;
    })
  ;
};
