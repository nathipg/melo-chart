import { REQUEST_STATUS } from '../../../../constants';
import i18n from '../../../../i18n';

import { fetchSongs } from './async-thunks';

const { t } = i18n;

export const addFetchSongsCases = (builder) => {
  builder
    .addCase(fetchSongs.pending, (state) => {
      state.songsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(fetchSongs.fulfilled, (state, action) => {
      state.songsStatus = REQUEST_STATUS.SUCCEEDED;
      state.songs = action.payload;
    })
    .addCase(fetchSongs.rejected, (state, action) => {
      state.songsStatus = REQUEST_STATUS.FAILED;
      state.songsError = t(`error-message.fetch-songs.${action.error.message}`);
    })
  ;
};
