import { memo, useEffect } from 'react';

import { GROWL_CONTAINER_ID, GROWL_TIMEOUT } from './constants';

import style from './Growl.module.scss';

const GrowlContainer = (props) => {
  const { children } = props;

  return (
    <div id={GROWL_CONTAINER_ID} className={style.GrowlContainer}>
      {children}
    </div>
  );
};

const Growl = (props) => {
  const { level, message, onCloseGrowl, fixed = false } = props;

  useEffect(() => {
    if(!fixed) {
      setTimeout(() => {
        onCloseGrowl();
      }, GROWL_TIMEOUT);
    }
  }, [ fixed, onCloseGrowl ]);

  return (
    message ? (
      <div className={style.Growl} data-level={level}>
        <button
          type="button"
          className={style.GrowlClose}
          onClick={onCloseGrowl}
        >
            x
        </button>
        {message}
      </div>
    ) : <></>
  );
};

const GrowlContainerMemo = memo(GrowlContainer);
const GrowlMemo = memo(Growl);

export {
  GrowlMemo as Growl,
  GrowlContainerMemo as GrowlContainer,
};
