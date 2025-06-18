import style from './Fret.module.scss';

const Fret = (props) => {
  const { children } = props;

  return (
    <div className={style.Fret}>
      {children}
    </div>
  );
};

export { Fret };
