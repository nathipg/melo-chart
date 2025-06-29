import { REQUEST_STATUS } from '../../../../constants';
import i18n from '../../../../i18n';
import { songSliceAsyncThunks } from '../async-thunks';

const { t } = i18n;

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
      existingSong.notes = updatedSong.notes;
    })
    .addCase(songSliceAsyncThunks.saveSong.rejected, (state, action) => {
      state.saveSongStatus = REQUEST_STATUS.FAILED;
      state.saveSongError = t(`error-message.save-song.${action.error.message}`);
    })
  ;
};
