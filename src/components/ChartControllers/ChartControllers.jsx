import { memo } from 'react';

import { AddSongTextOption } from './AddSongTextOption';
import { NewNotesOption } from './NewNotesOption';
import { NewPitchesOption } from './NewPitchesOption';
import { TrimOptions } from './TrimOptions';

import style from './ChartControllers.module.scss';

const ChartControllers = (props) => {
  const {
    onAddMultipleNotes,
    onAddMultiplePitches,
    onTrimPitches,
    onRemoveEmptyNotesAtTheEnd,
    onAddWordsAsNotes,
  } = props;

  return (
    <div className={style.ChartControllers}>
      <AddSongTextOption
        onAddWordsAsNotes={onAddWordsAsNotes}
      />

      <NewNotesOption
        onAddMultipleNotes={onAddMultipleNotes}
      />

      <NewPitchesOption
        onAddMultiplePitches={onAddMultiplePitches}
      />

      <TrimOptions
        onTrimPitches={onTrimPitches}
        onRemoveEmptyNotesAtTheEnd={onRemoveEmptyNotesAtTheEnd}
      />

    </div>
  );
};

const ChartControllersMemo = memo(ChartControllers);

export { ChartControllersMemo as ChartControllers };
