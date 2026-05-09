import { memo } from 'react';
import { useSelector } from 'react-redux';

import { Growl } from '@/components';
import { GrowlSlice } from '@/store/slices';

import style from './GrowlContainer.module.scss';

const GrowlContainer = () => {
  const growls = useSelector(GrowlSlice.selectors.selectAllGrowls);

  return (
    <div className={style.GrowlContainer}>
      {growls.map(growl => (
        <Growl
          key={growl.id}
          {...growl}
        />
      ))}
    </div>
  );
};

const GrowlContainerMemo = memo(GrowlContainer);

export { GrowlContainerMemo as GrowlContainer };
