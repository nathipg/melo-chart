import { useCallback } from 'react';

import { Checkbox } from '../Checkbox';
import { Frets } from '../Frets';

import style from './Song.module.scss';

const Song = (props) => {
  const { song, fretsFnsRef }= props;

  const onChangeWrapCheckbox = useCallback((value) => {
    fretsFnsRef.current?.setWrapFrets(value);
  }, [ fretsFnsRef ]);

  return (
    <div className={style.Song}>
      <div className={style.SongTitleContainer}>
        <h2>{song.title}</h2>

        <Checkbox
          className={style.WrapCheckbox}
          label="Wrap"
          initialValue={true}
          onChange={onChangeWrapCheckbox}
        />
      </div>

      <Frets
        frets={song.frets}
        fretsFnsRef={fretsFnsRef}
      />
    </div>
  );
};

export { Song };
