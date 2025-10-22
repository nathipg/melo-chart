import { isFulfilled, isRejected } from '@reduxjs/toolkit';

import i18n from '@/i18n';
import { growlUtils } from '@/utils';

import httpMessages from './http-messages.json';

const { t } = i18n;

export const thunkGrowlMiddleware = (store) => (next) => (action) => {
  if(isRejected(action)) {
    const httpMessage = httpMessages[action.type][action.error.code];
    const message = t(httpMessage);
    const dispatchGrowl = growlUtils.growlDispatcher(store.dispatch);

    dispatchGrowl(growlUtils.createErrorGrowl(message));
  } else if(isFulfilled(action)) {
    const httpMessage = httpMessages[action.type];
    const message = t(httpMessage);

    if(message) {
      const dispatchGrowl = growlUtils.growlDispatcher(store.dispatch);
      dispatchGrowl(growlUtils.createSuccessGrowl(message));
    }
  }

  return next(action);
};
