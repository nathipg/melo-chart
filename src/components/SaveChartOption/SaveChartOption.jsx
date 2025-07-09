import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, FloppyDiskIcon, GrowlFns, LoadingIcon } from '..';
import { songsSliceActions, songsSliceSelectors, usersSliceSelectors } from '../../store/slices';
import { isRequestLoading } from '../../utils';

import style from './SaveChartOption.module.scss';

const SaveChartOption = (props) => {
  const { songId, notesFnsRef } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const song = useSelector(songsSliceSelectors.selectSongById(songId));
  const loggedUser = useSelector(usersSliceSelectors.selectLoggedUser);
  const saveSongStatus = useSelector(songsSliceSelectors.selectSaveSongStatus);
  const saveSongMessage = useSelector(songsSliceSelectors.selectSaveSongMessage);
  const saveSongError = useSelector(songsSliceSelectors.selectSaveSongError);

  const onSaveSong = useCallback(async () => {
    const updatedNotes = notesFnsRef.current?.getNotes();
    const updatedTitle = song.title;

    dispatch(songsSliceActions.saveSong({
      song: {
        ...song,
        title: updatedTitle,
        notes: updatedNotes,
      },
      loggedUser,
    }));
  }, [ dispatch, loggedUser, notesFnsRef, song ]);

  const onCloseSaveSongErrorGrowl = useCallback(() => {
    dispatch(songsSliceActions.clearSaveSongError());
  }, [ dispatch ]);

  const onCloseSaveSongSuccessGrowl = useCallback(() => {
    dispatch(songsSliceActions.clearSaveSongStatus());
  }, [ dispatch ]);

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

      {GrowlFns.renderSuccessGrowl({
        message: saveSongMessage,
        onCloseGrowl: onCloseSaveSongSuccessGrowl,
      })}

      {GrowlFns.renderErrorGrowl({
        message: saveSongError,
        onCloseGrowl: onCloseSaveSongErrorGrowl,
      })}
    </div>
  );
};

const SaveChartOptionMemo = memo(SaveChartOption);

export { SaveChartOptionMemo as SaveChartOption };
