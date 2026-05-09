import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const UserPlusIcon = () => {
  return (
    <FontAwesomeIcon icon={faUserPlus} />
  );
};

const UserPlusIconMemo = memo(UserPlusIcon);

export { UserPlusIconMemo as UserPlusIcon };
