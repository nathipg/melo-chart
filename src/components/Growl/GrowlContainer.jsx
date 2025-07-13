import { memo } from 'react';

import { GROWL_CONTAINER_ID, TEST_IDS } from './constants';

import style from './GrowlContainer.module.scss';

const GrowlContainer = (props) => {
  const { children } = props;

  return (
    <div
      id={GROWL_CONTAINER_ID}
      className={style.GrowlContainer}
      data-testid={TEST_IDS.GROWL_CONTAINER}
    >
      {children}
    </div>
  );
};

const GrowlContainerMemo = memo(GrowlContainer);

export { GrowlContainerMemo as GrowlContainer };
