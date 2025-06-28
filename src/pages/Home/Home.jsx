import { memo } from 'react';

import { FormAddSong, SongList } from '../../components';

import style from './Home.module.scss';

const Home = () => {
  return (
    <div className={style.Home}>
      <FormAddSong />
      <SongList />
    </div>
  );
};

const HomeMemo = memo(Home);

export { HomeMemo as Home };
