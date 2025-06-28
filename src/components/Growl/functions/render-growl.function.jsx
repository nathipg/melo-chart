import { createPortal } from 'react-dom';

import { REQUEST_STATUS } from '../../../constants';
import { GROWL_CONTAINER_ID, GROWL_LEVEL } from '../constants';
import { Growl } from '../Growl';

const renderGrowl = (params) => {
  const { fixed, level, message, onCloseGrowl } = params;

  if(!level || !message) {
    return <></>;
  }

  const growlContainer = document.getElementById(GROWL_CONTAINER_ID);

  if(!growlContainer) {
    return <></>;
  }

  return (
    createPortal(
      <Growl
        fixed={fixed}
        level={level}
        message={message}
        onCloseGrowl={onCloseGrowl}
      />,
      document.getElementById(GROWL_CONTAINER_ID),
    )
  );
};

export const renderErrorGrowl = (params) => {
  const { message, onCloseGrowl, fixed = true } = params;

  return renderGrowl({
    fixed,
    message,
    level: GROWL_LEVEL.ERROR,
    onCloseGrowl,
  });
};

export const renderInfoGrowl = (params) => {
  const { message, onCloseGrowl, fixed = true } = params;

  return renderGrowl({
    fixed,
    message,
    level: GROWL_LEVEL.INFO,
    onCloseGrowl,
  });
};

export const renderSavedGrowl = (params) => {
  const { requestStatus, onCloseGrowl } = params;

  if(requestStatus != REQUEST_STATUS.SUCCEEDED) {
    return <></>;
  }
    
  return (
    renderSuccessGrowl({
      message: 'Saved',
      onCloseGrowl,
    })
  );
};

export const renderSuccessGrowl = (params) => {
  const { message, onCloseGrowl, fixed = false } = params;

  return renderGrowl({
    fixed,
    message,
    level: GROWL_LEVEL.SUCCESS,
    onCloseGrowl,
  });
};

export const renderWarnGrowl = (params) => {
  const { message, onCloseGrowl, fixed = true } = params;

  return renderGrowl({
    fixed,
    message,
    level: GROWL_LEVEL.WARN,
    onCloseGrowl,
  });
};
