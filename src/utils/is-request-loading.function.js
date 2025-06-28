import { REQUEST_STATUS } from '../constants';

export const isRequestLoading = (requestStatus) => {
  return requestStatus == REQUEST_STATUS.LOADING;
};
