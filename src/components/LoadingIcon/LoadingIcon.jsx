import { memo } from 'react';

import style from './LoadingIcon.module.scss';

const LoadingIcon = () => {
  return (
    <span className={style.LoadingIcon}>::loading icon here::</span>
  );
};

const LoadingIconMemo = memo(LoadingIcon);

export { LoadingIconMemo as LoadingIcon };
