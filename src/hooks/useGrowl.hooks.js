import { useDispatch } from 'react-redux';

import { growlUtils } from '@/utils';

export const useGrowl = () => {
  const dispatch = useDispatch();

  const dispatchGrowl = growlUtils.growlDispatcher(dispatch);

  return {
    success: (message) => dispatchGrowl(growlUtils.createSuccessGrowl(message)),
    error: (message) => dispatchGrowl(growlUtils.createErrorGrowl(message)),
    warn: (message) => dispatchGrowl(growlUtils.createWarnGrowl(message)),
  };
};
