import { REQUEST_STATUS } from '../../../../constants';
import i18n from '../../../../i18n';

import { deleteSong } from './async-thunks';

const { t } = i18n;

export const addDeleteSongCases = (builder) => {
  builder
    .addCase(deleteSong.pending, (state) => {
      state.deleteSongStatus = REQUEST_STATUS.LOADING;
      state.deleteSongError = null;
    })
    .addCase(deleteSong.fulfilled, (state, action) => {
      state.deleteSongStatus = REQUEST_STATUS.SUCCEEDED;
      
      const songIndex = state.songs.findIndex(song => song.id == action.payload.id);
      state.songs.splice(songIndex, 1);
    })
    .addCase(deleteSong.rejected, (state, action) => {
      state.deleteSongStatus = REQUEST_STATUS.FAILED;
      state.deleteSongError = t(`error-message.delete-song.${action.error.message}`);
    })
  ;
};
