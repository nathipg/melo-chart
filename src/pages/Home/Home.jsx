import { memo } from 'react';

import { AddSongDialog, SongList } from '../../components';

import style from './Home.module.scss';

const Home = () => {
  return (
    <div className={style.Home}>
      <AddSongDialog />
      <SongList />
    </div>
  );
};

const HomeMemo = memo(Home);

export { HomeMemo as Home };
