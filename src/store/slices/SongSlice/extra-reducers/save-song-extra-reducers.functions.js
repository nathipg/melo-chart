import { REQUEST_STATUS } from '../../../../constants';
import { songSliceAsyncThunks } from '../async-thunks';

export const addSaveSongCases = (builder) => {
  builder
    .addCase(songSliceAsyncThunks.saveSong.pending, (state) => {
      state.saveSongStatus = REQUEST_STATUS.LOADING;
      state.saveSongError = null;
    })
    .addCase(songSliceAsyncThunks.saveSong.fulfilled, (state, action) => {
      state.saveSongStatus = REQUEST_STATUS.SUCCEEDED;

      const updatedSong = action.payload;

      const existingSong = state.songs.find(song => song.id === updatedSong.id);
      existingSong.frets = updatedSong.frets;
    })
    .addCase(songSliceAsyncThunks.saveSong.rejected, (state, action) => {
      state.saveSongStatus = REQUEST_STATUS.FAILED;
      state.saveSongError = action.error.message;
    })
  ;
};
