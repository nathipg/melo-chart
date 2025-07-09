import { memo } from 'react';

import style from './MeloChartIcon.module.scss';

const MeloChartIcon = () => {
  return (
    <span className={style.MeloChartIcon}></span>
  );
};

const MeloChartIconMemo = memo(MeloChartIcon);

export { MeloChartIconMemo as MeloChartIcon };
