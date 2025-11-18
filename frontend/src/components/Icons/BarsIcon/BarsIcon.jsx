import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const BarsIcon = () => {
  return (
    <FontAwesomeIcon icon={faBars} />
  );
};

const BarsIconMemo = memo(BarsIcon);

export { BarsIconMemo as BarsIcon };
