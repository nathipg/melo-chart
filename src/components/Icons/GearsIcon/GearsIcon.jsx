import { faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const GearsIcon = () => {
  return (
    <FontAwesomeIcon icon={faGears} />
  );
};

const GearsIconMemo = memo(GearsIcon);

export { GearsIconMemo as GearsIcon };
