import { useEffect, useState } from 'react';

import style from './Checkbox.module.scss';

const Checkbox = (props) => {
  const { label, initialValue, className = '', onChange } = props;
  const [ checked, setChecked ] = useState(initialValue);

  useEffect(() => {
    onChange(checked);
  }, [ checked, onChange ]);

  return (
    <label className={`${style.Checkbox} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          setChecked(curChecked => !curChecked);
        }}
      />
      <span>
        {label}
      </span>
    </label>
  );
};

export { Checkbox };
