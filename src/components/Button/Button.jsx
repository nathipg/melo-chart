import { memo } from 'react';

import { ButtonCategories } from './constants';

import style from './Button.module.scss';

const Button = (props) => {
  const { category = ButtonCategories.DEFAULT, onClick, children, className = '' } = props;

  return (
    <button
      className={`${style.Button} ${className}`}
      onClick={onClick}
      data-category={category}
    >
      {children}
    </button>
  );
};

const ButtonMemo = memo(Button);

export { ButtonMemo as Button };
