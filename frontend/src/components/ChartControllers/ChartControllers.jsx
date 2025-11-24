import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '@/components';

import { DeleteSongOption } from './DeleteSongOption';
import { NewNotesOption } from './NewNotesOption';
import { NewPitchesOption } from './NewPitchesOption';
import { ShareWithOption } from './ShareWithOption';
import { TrimOptions } from './TrimOptions';

import style from './ChartControllers.module.scss';

const ChartControllers = (props) => {
  const { song } = props;
  const { notesFnsRef, generateChartDialogFnsRef, deleteSongDialogFnsRef, setChangesLog } = props;

  const { t } = useTranslation();

  return (
    <div className={style.ChartControllers}>
      <div className={style.Section}>
        <NewNotesOption
          notesFnsRef={notesFnsRef}
          songId={song.id}
          setChangesLog={setChangesLog}
        />

        <NewPitchesOption
          notesFnsRef={notesFnsRef}
          songId={song.id}
          setChangesLog={setChangesLog}
        />

        <TrimOptions
          notesFnsRef={notesFnsRef}
          songId={song.id}
          setChangesLog={setChangesLog}
        />
      </div>

      <div className={style.Section}>
        <ShareWithOption
          songId={song.id}
          setChangesLog={setChangesLog}
        />
      </div>

      <div className={style.Section}>
        <Button
          category={ButtonConstants.ButtonCategories.DANGER}
          onClick={() => generateChartDialogFnsRef.current?.show()}
        >
          {t('Generate mapping with lyrics')}
        </Button>

        <DeleteSongOption
          song={song}
          deleteSongDialogFnsRef={deleteSongDialogFnsRef}
        />
      </div>
    </div>
  );
};

const ChartControllersMemo = memo(ChartControllers);

export { ChartControllersMemo as ChartControllers };
