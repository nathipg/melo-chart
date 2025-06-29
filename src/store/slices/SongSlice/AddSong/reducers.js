import { REQUEST_STATUS } from '../../../../constants';

export const clearAddSongError = (state) => {
  state.addSongError = null;
};

export const clearAddSongStatus = (state) => {
  state.addSongStatus = REQUEST_STATUS.IDLE;
};

export const setAddSongError = (state, action) => {
  state.addSongError = action.payload;
};
