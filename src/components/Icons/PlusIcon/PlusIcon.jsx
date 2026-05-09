import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const PlusIcon = () => {
  return (
    <FontAwesomeIcon icon={faPlus} />
  );
};

const PlusIconMemo = memo(PlusIcon);

export { PlusIconMemo as PlusIcon };
