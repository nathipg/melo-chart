import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, ConfigSongDialog, DeleteSongConfirmDialog, GearsIcon, HowToUseDialog, Notes } from '@/components';

import { SongTitle } from './SongTitle/SongTitle';

import style from './Song.module.scss';

const Song = (props) => {
  const { notesFnsRef, generateChartDialogFnsRef, song } = props;

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
        />
      </div>

      <Notes
        notes={song.notes}
        notesFnsRef={notesFnsRef}
      />

      <ConfigSongDialog
        song={song}
        configSongDialogFnsRef={configSongDialogFnsRef}
        generateChartDialogFnsRef={generateChartDialogFnsRef}
        deleteSongDialogFnsRef={deleteSongDialogFnsRef}
        notesFnsRef={notesFnsRef}
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
