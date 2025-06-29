import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { REQUEST_STATUS } from '../../constants';
import { songsSliceFns } from '../../store/slices';
import { LoadingIcon } from '../Icons';

import { renderSongs } from './functions';

import style from './SongList.module.scss';

const SongList = () => {
  const { t } = useTranslation();

  const songs = useSelector(songsSliceFns.selectAllSongs);
  const songsStatus = useSelector(songsSliceFns.selectSongsStatus);
  const songsError = useSelector(songsSliceFns.selectSongsError);

  const CONTENT_MAPPER = useMemo(() => {
    return {
      [REQUEST_STATUS.LOADING]: (
        <div>
          <LoadingIcon /> <span>{t('Loading...')}</span>
        </div>
      ),
      [REQUEST_STATUS.FAILED]: <span>{songsError}</span>,
      [REQUEST_STATUS.SUCCEEDED]: (
        <>
          {renderSongs(songs)}
        </>
      ),
    };
  }, [ songs, songsError, t ]);

  return (
    <div className={style.SongListContainer}>
      <h2>{t('Song List')}</h2>
      <ul className={style.SongList}>
        {CONTENT_MAPPER[songsStatus]}
      </ul>
    </div>
  );
};

const SongListMemo = memo(SongList);

export { SongListMemo as SongList };
