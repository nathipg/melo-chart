import style from './Button.module.scss';

const Button = (props) => {
  const { category, onClick, children, className = '' } = props;

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

export { Button };
