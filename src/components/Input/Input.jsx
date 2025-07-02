import { memo } from 'react';

import style from './Input.module.scss';

const Input = (props) => {
  return (
    <input
      className={style.Input}
      {...props}
    />
  );
};

const InputMemo = memo(Input);

export { InputMemo as Input };
