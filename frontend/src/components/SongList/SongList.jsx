import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { SongSlice, UserSlice } from '@/store/slices';

import { renderSharedWithMeSongs, renderSongs } from './functions';

import style from './SongList.module.scss';

const SongList = () => {
  const { t } = useTranslation();

  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);
  const songs = useSelector(SongSlice.selectors.selectAllSongs);
  
  const mySongs = useMemo(() => {
    return songs.filter(song => song.owner == loggedUser?.uid);
  }, [ loggedUser?.uid, songs ]);

  const songsSharedWithMe = useMemo(() => {
    return songs.filter(song => song.owner != loggedUser?.uid);
  }, [ loggedUser?.uid, songs ]);

  return (
    <>
      <div className={style.SongListContainer}>
        <h2>{t('My Songs')}</h2>
        <ul className={style.SongList}>
          {renderSongs(mySongs)}
        </ul>
      </div>
      <div className={style.SongListContainer}>
        <h2>{t('Songs Shared With Me')}</h2>
        <ul className={style.SongList}>
          {renderSharedWithMeSongs(songsSharedWithMe)}
        </ul>
      </div>
    </>
  );
};

const SongListMemo = memo(SongList);

export { SongListMemo as SongList };
