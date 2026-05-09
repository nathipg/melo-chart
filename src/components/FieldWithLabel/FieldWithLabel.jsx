import { memo } from 'react';

import style from './FieldWithLabel.module.scss';

const FieldWithLabel = (props) => {
  const { label, field } = props;

  return (
    <label className={style.FieldWithLabel}>
      <span>{label}</span>
      {field}
    </label>
  );
};

const FieldWithLabelMemo = memo(FieldWithLabel);

export { FieldWithLabelMemo as FieldWithLabel };
