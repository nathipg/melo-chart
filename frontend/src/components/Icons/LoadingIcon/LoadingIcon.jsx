import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

import style from './LoadingIcon.module.scss';

const LoadingIcon = (props) => {
  const { size = '1x' } = props;

  return (
    <span className={style.LoadingIcon}>
      <FontAwesomeIcon
        icon={faSpinner}
        size={size}
      />
    </span>
  );
};

const LoadingIconMemo = memo(LoadingIcon);

export { LoadingIconMemo as LoadingIcon };
