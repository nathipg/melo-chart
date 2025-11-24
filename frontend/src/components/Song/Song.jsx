import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, ConfigSongDialog, DeleteSongConfirmDialog, GearsIcon, HowToUseDialog, Notes } from '@/components';

import { SongTitle } from './SongTitle/SongTitle';

import style from './Song.module.scss';

const Song = (props) => {
  const { notesFnsRef, generateChartDialogFnsRef, song, setChangesLog } = props;

  const { t } = useTranslation();

  const configSongDialogFnsRef = useRef(null);
  const deleteSongDialogFnsRef = useRef(null);

  return (
    <div className={style.Song}>
      <HowToUseDialog />
      
      <Button
        category={ButtonConstants.ButtonCategories.PRIMARY}
        onClick={() => configSongDialogFnsRef.current?.show()}
        icon={<GearsIcon />}
      >
        {t('Configure Song')}
      </Button>
        
      <div className={style.SongTitleContainer}>
        <SongTitle
          id={song.id}
          title={song.title}
          notesFnsRef={notesFnsRef}
          setChangesLog={setChangesLog}
        />
      </div>

      <Notes
        songId={song.id}
        notes={song.notes}
        notesFnsRef={notesFnsRef}
        setChangesLog={setChangesLog}
      />

      <ConfigSongDialog
        song={song}
        configSongDialogFnsRef={configSongDialogFnsRef}
        generateChartDialogFnsRef={generateChartDialogFnsRef}
        deleteSongDialogFnsRef={deleteSongDialogFnsRef}
        notesFnsRef={notesFnsRef}
        setChangesLog={setChangesLog}
      />

      <DeleteSongConfirmDialog
        deleteSongDialogFnsRef={deleteSongDialogFnsRef}
        song={song}
      />
    </div>
  );
};

const SongMemo = memo(Song);

export { SongMemo as Song };
