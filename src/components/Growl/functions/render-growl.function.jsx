import { createPortal } from 'react-dom';

import { GROWL_CONTAINER_ID } from '../constants';
import { Growl } from '../Growl';

export const renderGrowl = (params) => {
  const { fixed, level, message, onCloseGrowl } = params;

  if(!level || !message || !onCloseGrowl) {
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
