import { memo } from 'react';

import { LoadingIcon } from '@/components';

import style from './BlockUI.module.scss';

const BlockUI = () => {
  return (
    <div className={style.BlockUI}>
      <LoadingIcon size={'3x'} />
    </div>
  );
};

const BlockUIMemo = memo(BlockUI);

export { BlockUIMemo as BlockUI };
