import { REQUEST_STATUS } from '../../../../constants';
import i18n from '../../../../i18n';
import { songSliceAsyncThunks } from '../async-thunks';

const { t } = i18n;

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
      state.addSongError = t(`error-message.add-song.${action.error.message}`);
    })
  ;
};
