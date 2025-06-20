import { Frets } from '../Frets';

import style from './Song.module.scss';

const Song = (props) => {
  const { song, fretsFnsRef }= props;

  return (
    <div className={style.Song}>
      <h2>{song.title}</h2>

      <Frets
        frets={song.frets}
        fretsFnsRef={fretsFnsRef}
      />
    </div>
  );
};

export { Song };
