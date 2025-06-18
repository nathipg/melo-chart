import style from './FretChunk.module.scss';

const FretChunk = (props) => {
  const { text, color } = props;

  return (
    <div className={style.FretChunk} style={{ borderBottomColor: color }}>
      {text}
    </div>
  );
};

export { FretChunk };
