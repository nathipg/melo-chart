import { memo } from 'react';

import { AddSongTextOption } from './AddSongTextOption';
import { NewFretsOption } from './NewFretsOption';
import { NewPitchesOption } from './NewPitchesOption';
import { TrimOptions } from './TrimOptions';

import style from './ChartControllers.module.scss';

const ChartControllers = (props) => {
  const {
    onAddMultipleFrets,
    onAddMultiplePitches,
    onTrimPitches,
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

      <NewPitchesOption
        onAddMultiplePitches={onAddMultiplePitches}
      />

      <TrimOptions
        onTrimPitches={onTrimPitches}
        onRemoveEmptyFretsAtTheEnd={onRemoveEmptyFretsAtTheEnd}
      />

    </div>
  );
};

const ChartControllersMemo = memo(ChartControllers);

export { ChartControllersMemo as ChartControllers };
