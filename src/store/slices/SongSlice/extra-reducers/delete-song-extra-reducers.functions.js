import { REQUEST_STATUS } from '../../../../constants';
import i18n from '../../../../i18n';
import { songSliceAsyncThunks } from '../async-thunks';

const { t } = i18n;

export const addDeleteSongCases = (builder) => {
  builder
    .addCase(songSliceAsyncThunks.deleteSong.pending, (state) => {
      state.deleteSongStatus = REQUEST_STATUS.LOADING;
      state.deleteSongError = null;
    })
    .addCase(songSliceAsyncThunks.deleteSong.fulfilled, (state) => {
      state.deleteSongStatus = REQUEST_STATUS.SUCCEEDED;
      window.location.replace('/');
    })
    .addCase(songSliceAsyncThunks.deleteSong.rejected, (state, action) => {
      state.deleteSongStatus = REQUEST_STATUS.FAILED;
      state.deleteSongError = t(`error-message.delete-song.${action.error.message}`);
    })
  ;
};
