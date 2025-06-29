import { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '../Button';
import { Checkbox } from '../Checkbox';
import { ConfigSongDialog } from '../ConfigSongDialog';
import { GearsIcon } from '../Icons/GearsIcon/GearsIcon';
import { Notes } from '../Notes';
import { SaveChartOption } from '../SaveChartOption';

import style from './Song.module.scss';

const Song = (props) => {
  const { notesFnsRef, generateChartDialogFnsRef, song }= props;

  const { t } = useTranslation();

  const configSongDialogFnsRef = useRef(null);

  const onChangeWrapCheckbox = useCallback((value) => {
    notesFnsRef.current?.setWrapNotes(value);
  }, [ notesFnsRef ]);

  return (
    <div className={style.Song}>
      <div className={style.SongTitleContainer}>
        <h2>{song.title}</h2>

        <Button
          category={ButtonConstants.ButtonCategories.PRIMARY}
          textOnly={true}
          onClick={() => configSongDialogFnsRef.current?.show()}
        >
          <GearsIcon />
        </Button>

        <Checkbox
          className={style.CheckboxContainer}
          label={t('Break Chart')}
          initialValue={true}
          onChange={onChangeWrapCheckbox}
        />

        <SaveChartOption
          song={song}
          notesFnsRef={notesFnsRef}
        />
      </div>

      <Notes
        notes={song.notes}
        notesFnsRef={notesFnsRef}
      />

      <ConfigSongDialog
        configSongDialogFnsRef={configSongDialogFnsRef}
        generateChartDialogFnsRef={generateChartDialogFnsRef}
        notesFnsRef={notesFnsRef}
      />
    </div>
  );
};

const SongMemo = memo(Song);

export { SongMemo as Song };
