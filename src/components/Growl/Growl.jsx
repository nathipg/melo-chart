import { memo, useEffect } from 'react';

import { GROWL_TIMEOUT, TEST_IDS } from './constants';

import style from './Growl.module.scss';

export { GrowlMemo as Growl };

const Growl = (props) => {
  const { level, message, onCloseGrowl, fixed = false } = props;

  useEffect(() => {
    if(!fixed) {
      setTimeout(() => {
        onCloseGrowl();
      }, GROWL_TIMEOUT);
    }
  }, [ fixed, onCloseGrowl ]);

  if(!level || !message || !onCloseGrowl) {
    return <></>;
  }

  return (
    <div
      className={style.Growl}
      data-level={level}
      data-testid={TEST_IDS.GROWL}
    >
      <button
        type="button"
        className={style.GrowlClose}
        onClick={onCloseGrowl}
        data-testid={TEST_IDS.GROWL_CLOSE_BTN}
      >
            x
      </button>
      {message}
    </div>
  );
};

const GrowlMemo = memo(Growl);
