import { GROWL_LEVEL } from '../constants';

import { renderGrowl } from './render-growl.function';

export const renderWarnGrowl = (params) => {
  const { message, onCloseGrowl, fixed = true } = params;

  return renderGrowl({
    fixed,
    message,
    level: GROWL_LEVEL.WARN,
    onCloseGrowl,
  });
};
