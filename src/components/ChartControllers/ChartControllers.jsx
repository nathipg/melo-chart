import { NewFretsOption } from './NewFretsOption';
import { NewStringsOption } from './NewStringsOption';
import { TrimOptions } from './TrimOptions';

import style from './ChartControllers.module.scss';

const ChartControllers = (props) => {
  const {
    onAddMultipleFrets,
    onAddMultipleStrings,
    onTrimStrings,
    onRemoveEmptyFretsAtTheEnd,
  } = props;

  return (
    <div className={style.ChartControllers}>
      <NewFretsOption
        onAddMultipleFrets={onAddMultipleFrets}
      />

      <NewStringsOption
        onAddMultipleStrings={onAddMultipleStrings}
      />

      <TrimOptions
        onTrimStrings={onTrimStrings}
        onRemoveEmptyFretsAtTheEnd={onRemoveEmptyFretsAtTheEnd}
      />

    </div>
  );
};

export { ChartControllers };
