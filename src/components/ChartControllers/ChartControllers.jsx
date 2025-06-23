import { memo } from 'react';

import { AddSongTextOption } from './AddSongTextOption';
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
    onAddWordsAsNotes,
  } = props;

  return (
    <div className={style.ChartControllers}>
      <AddSongTextOption
        onAddWordsAsNotes={onAddWordsAsNotes}
      />

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

const ChartControllersMemo = memo(ChartControllers);

export { ChartControllersMemo as ChartControllers };
