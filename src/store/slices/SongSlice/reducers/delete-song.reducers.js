import { REQUEST_STATUS } from '../../../../constants';

export const clearDeleteSongError = (state) => {
  state.deleteSongError = null;
};

export const clearDeleteSongStatus = (state) => {
  state.deleteSongStatus = REQUEST_STATUS.IDLE;
};

