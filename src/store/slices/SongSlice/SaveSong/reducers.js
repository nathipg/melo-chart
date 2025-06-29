import { REQUEST_STATUS } from '../../../../constants';

export const clearSaveSongError = (state) => {
  state.saveSongError = null;
};

export const clearSaveSongStatus = (state) => {
  state.saveSongStatus = REQUEST_STATUS.IDLE;
};
