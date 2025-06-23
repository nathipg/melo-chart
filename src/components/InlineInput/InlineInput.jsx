import { memo } from 'react';

import style from './InlineInput.module.scss';

const InlineInput = (props) => {
  const { label, ...inputProps } = props;

  return (
    <label className={style.InlineInput}>
      <span>{label}</span>
      <input {...inputProps} />
    </label>
  );
};

const InlineInputMemo = memo(InlineInput);

export { InlineInputMemo as InlineInput };
