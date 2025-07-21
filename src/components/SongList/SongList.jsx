import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { SongSlice } from '@/store/slices';

import { renderSongs } from './functions';

import style from './SongList.module.scss';

const SongList = () => {
  const { t } = useTranslation();

  const songs = useSelector(SongSlice.selectors.selectAllSongs);

  return (
    <div className={style.SongListContainer}>
      <h2>{t('Song List')}</h2>
      <ul className={style.SongList}>
        {renderSongs(songs)}
      </ul>
    </div>
  );
};

const SongListMemo = memo(SongList);

export { SongListMemo as SongList };
