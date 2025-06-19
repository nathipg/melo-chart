import style from './FretChunk.module.scss';

const FretChunk = (props) => {
  const { text, chunkIndex, fretIndex, hasRightBorder, onOpenContextMenu } = props;

  const noteIndex = (chunkIndex % 12) + 1;

  return (
    <div
      className={style.FretChunk}
      onContextMenu={(e) => {
        e.preventDefault();
        
        onOpenContextMenu({
          chunkIndex,
          fretIndex,
          top: e.pageY,
          left: e.pageX,
        });
      }}
      data-note-index={noteIndex}
      data-has-text={text ? 'true' : 'false'}
      data-has-right-border={hasRightBorder}>
      {text}
    </div>
  );
};

export { FretChunk };
