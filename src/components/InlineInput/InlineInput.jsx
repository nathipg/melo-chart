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

export { InlineInput };
