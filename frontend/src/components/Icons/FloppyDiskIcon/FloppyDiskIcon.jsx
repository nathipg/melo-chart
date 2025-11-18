import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const FloppyDiskIcon = () => {
  return (
    <FontAwesomeIcon icon={faFloppyDisk} />
  );
};

const FloppyDiskIconMemo = memo(FloppyDiskIcon);

export { FloppyDiskIconMemo as FloppyDiskIcon };
