import { GROWL_LEVEL } from '../constants';

import { renderGrowl } from './render-growl.function';

export const renderInfoGrowl = (params) => {
  const { message, onCloseGrowl, fixed = false } = params;

  return renderGrowl({
    fixed,
    message,
    level: GROWL_LEVEL.INFO,
    onCloseGrowl,
  });
};
