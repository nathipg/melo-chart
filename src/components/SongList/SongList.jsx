import { memo } from 'react';

import { renderSongs } from './functions';

import style from './SongList.module.scss';

const SongList = (props) => {
  const { songs } = props;

  return (
    <div className={style.SongListContainer}>
      <h2>Song List</h2>
      <ul className={style.SongList}>
        {renderSongs(songs)}
      </ul>
    </div>
  );
};

const SongListMemo = memo(SongList);

export { SongListMemo as SongList };
