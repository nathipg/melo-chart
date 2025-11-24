import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, FloppyDiskIcon, LoadingIcon } from '@/components';
import { SongSlice } from '@/store/slices';
import { isRequestLoading } from '@/utils';

import style from './SaveChartOption.module.scss';

const SaveChartOption = (props) => {
  const { songId, notesFnsRef, setChangesLog } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const song = useSelector(SongSlice.selectors.selectSongById(songId));
  const saveSongStatus = useSelector(SongSlice.selectors.selectSaveSongStatus);

  const onSaveSong = useCallback(async () => {
    const updatedNotes = notesFnsRef.current?.getNotes();
    const updatedTitle = song.title;

    dispatch(SongSlice.actions.saveSong({
      ...song,
      title: updatedTitle,
      notes: updatedNotes,
    }));

    setChangesLog([]);
  }, [ dispatch, notesFnsRef, setChangesLog, song ]);

  return (
    <div className={style.SaveChartOption}>
      <Button
        className={style.SaveSongButton}
        onClick={onSaveSong}
        category={ButtonConstants.ButtonCategories.SUCCESS}
        icon={<FloppyDiskIcon />}
      >
        {isRequestLoading(saveSongStatus) ? <LoadingIcon /> : <></>} {t('Save Changes')}
      </Button>
    </div>
  );
};

const SaveChartOptionMemo = memo(SaveChartOption);

export { SaveChartOptionMemo as SaveChartOption };
