import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

import style from './LoadingIcon.module.scss';

const LoadingIcon = () => {
  return (
    <span className={style.LoadingIcon}>
      <FontAwesomeIcon icon={faSpinner} />
    </span>
  );
};

const LoadingIconMemo = memo(LoadingIcon);

export { LoadingIconMemo as LoadingIcon };
