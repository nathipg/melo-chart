import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const RightToBracketIcon = () => {
  return (
    <FontAwesomeIcon icon={faRightToBracket} />
  );
};

const RightToBracketIconMemo = memo(RightToBracketIcon);

export { RightToBracketIconMemo as RightToBracketIcon };
