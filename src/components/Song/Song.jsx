import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '../Checkbox';
import { Notes } from '../Notes';
import { SaveChartOption } from '../SaveChartOption';

import style from './Song.module.scss';

const Song = (props) => {
  const { notesFnsRef, song }= props;

  const { t } = useTranslation();

  const onChangeWrapCheckbox = useCallback((value) => {
    notesFnsRef.current?.setWrapNotes(value);
  }, [ notesFnsRef ]);

  return (
    <div className={style.Song}>
      <div className={style.SongTitleContainer}>
        <h2>{song.title}</h2>

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
    </div>
  );
};

const SongMemo = memo(Song);

export { SongMemo as Song };
