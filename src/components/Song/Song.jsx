import { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '../Button';
import { Checkbox } from '../Checkbox';
import { ConfigSongDialog, DeleteSongConfirmDialog } from '../Dialogs';
import { HowToUseDialog } from '../Dialogs/HowToUseDialog';
import { GearsIcon } from '../Icons/GearsIcon/GearsIcon';
import { Notes } from '../Notes';
import { SaveChartOption } from '../SaveChartOption';

import style from './Song.module.scss';

const Song = (props) => {
  const { notesFnsRef, generateChartDialogFnsRef, song } = props;

  const { t } = useTranslation();

  const configSongDialogFnsRef = useRef(null);
  const deleteSongDialogFnsRef = useRef(null);

  const onChangeWrapCheckbox = useCallback((value) => {
    notesFnsRef.current?.setWrapNotes(value);
  }, [ notesFnsRef ]);

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
        <h2>{song.title}</h2>

        <SaveChartOption
          song={song}
          notesFnsRef={notesFnsRef}
        />

        <Checkbox
          className={style.CheckboxContainer}
          label={t('Break Chart')}
          initialValue={true}
          onChange={onChangeWrapCheckbox}
        />
      </div>

      <Notes
        notes={song.notes}
        notesFnsRef={notesFnsRef}
      />

      <ConfigSongDialog
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
