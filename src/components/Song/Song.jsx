import { memo, useCallback } from 'react';

import { Checkbox } from '../Checkbox';
import { Frets } from '../Frets';
import { SaveChartOption } from '../SaveChartOption';

import style from './Song.module.scss';

const Song = (props) => {
  const { fretsFnsRef, song }= props;

  const onChangeWrapCheckbox = useCallback((value) => {
    fretsFnsRef.current?.setWrapFrets(value);
  }, [ fretsFnsRef ]);

  const onChangeStringNumberCheckbox = useCallback((value) => {
    fretsFnsRef.current?.setShowStringNumber(value);
  }, [ fretsFnsRef ]);

  return (
    <div className={style.Song}>
      <div className={style.SongTitleContainer}>
        <h2>{song.title}</h2>

        <Checkbox
          className={style.CheckboxContainer}
          label="Wrap"
          initialValue={true}
          onChange={onChangeWrapCheckbox}
        />

        <Checkbox
          className={style.CheckboxContainer}
          label="String Number"
          initialValue={false}
          onChange={onChangeStringNumberCheckbox}
        />

        <SaveChartOption
          song={song}
          fretsFnsRef={fretsFnsRef}
        />
      </div>

      <Frets
        frets={song.frets}
        fretsFnsRef={fretsFnsRef}
      />
    </div>
  );
};

const SongMemo = memo(Song);

export { SongMemo as Song };
