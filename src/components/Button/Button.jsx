import { memo } from 'react';

import { ButtonCategories } from './constants';

import style from './Button.module.scss';

const Button = (props) => {
  const { category = ButtonCategories.DEFAULT, children, className = '', ...otherProps } = props;

  return (
    <button
      className={`${style.Button} ${className}`}
      data-category={category}
      {...otherProps}
    >
      {children}
    </button>
  );
};

const ButtonMemo = memo(Button);

export { ButtonMemo as Button };
