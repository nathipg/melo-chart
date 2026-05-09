import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { GrowlSlice } from '@/store/slices';

import style from './Growl.module.scss';

export { GrowlMemo as Growl };

const Growl = (props) => {
  const { id, level, message } = props;

  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    dispatch(GrowlSlice.actions.removeGrowl(id));
  }, [ dispatch, id ]);

  return (
    <div
      className={style.Growl}
      data-level={level}
    >
      <button
        type="button"
        className={style.GrowlClose}
        onClick={onClose}
      >
        x
      </button>
      {message}
    </div>
  );
};

const GrowlMemo = memo(Growl);
