import { FormAddSong, SongList } from '../../components';

import style from './Home.module.scss';

const Home = (props) => {
  const { songs, setSongs } = props;

  return (
    <div className={style.Home}>
      <FormAddSong songs={songs} setSongs={setSongs} />
      <SongList songs={songs} />
    </div>
  );
};

export { Home };
