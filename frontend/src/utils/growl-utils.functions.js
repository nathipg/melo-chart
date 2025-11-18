import { GrowlSlice } from '@/store/slices';

import { getUniqueId } from './get-unique-id.function';

export const GROWL_TIMEOUT = 5000;

const GROWL_LEVEL = Object.freeze({
  ERROR: 'ERROR',
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  WARN: 'WARN',
});

const createGrowl = (level, message, options) => {
  return {
    id: getUniqueId(),
    level,
    message,
    fixed: options?.fixed ?? true,
  };
};

export const createErrorGrowl = (message) => {
  return createGrowl(GROWL_LEVEL.ERROR, message);
};

export const createSuccessGrowl = (message) => {
  return createGrowl(GROWL_LEVEL.SUCCESS, message, { fixed: false });
};

export const createWarnGrowl = (message) => {
  return createGrowl(GROWL_LEVEL.WARN, message);
};

export const growlDispatcher = (dispatch) => (growl) => {
  if(!growl.fixed) {
    setTimeout(() => {
      dispatch(GrowlSlice.actions.removeGrowl(growl.id));
    }, GROWL_TIMEOUT);
  }

  dispatch(GrowlSlice.actions.addGrowl(growl));
};
