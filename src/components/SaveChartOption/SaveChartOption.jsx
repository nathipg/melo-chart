import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, GrowlFns, LoadingIcon } from '..';
import { songsSliceActions, songsSliceSelectors } from '../../store/slices';
import { isRequestLoading } from '../../utils';

import style from './SaveChartOption.module.scss';

const SaveChartOption = (props) => {
  const { notesFnsRef, song } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const saveSongStatus = useSelector(songsSliceSelectors.selectSaveSongStatus);
  const saveSongError = useSelector(songsSliceSelectors.selectSaveSongError);

  const onSaveSong = useCallback(async () => {
    const updatedNotes = notesFnsRef.current?.getNotes();

    dispatch(songsSliceActions.saveSong({
      ...song,
      isNewSong: false,
      notes: updatedNotes,
    }));
  }, [ dispatch, notesFnsRef, song ]);

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
      >
        {isRequestLoading(saveSongStatus) ? <LoadingIcon /> : <></>} {t('Save Changes')}
      </Button>

      {GrowlFns.renderSavedGrowl({
        requestStatus: saveSongStatus,
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
