import { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, GrowlFns } from '..';
import { songsSliceFns } from '../../store/slices';
import { isRequestLoading } from '../../utils';

import style from './SaveChartOption.module.scss';

const SaveChartOption = (props) => {
  const { notesFnsRef, song } = props;

  const dispatch = useDispatch();

  const saveSongStatus = useSelector(songsSliceFns.selectSaveSongStatus);
  const saveSongError = useSelector(songsSliceFns.selectSaveSongError);

  const onSaveSong = useCallback(async () => {
    const updatedNotes = notesFnsRef.current?.getNotes();

    dispatch(songsSliceFns.saveSong({
      ...song,
      notes: updatedNotes,
    }));
  }, [ dispatch, notesFnsRef, song ]);

  const saveButtonLabel = useMemo(() => {
    return isRequestLoading(saveSongStatus) ? 'Saving Changes...' : 'Save Changes';
  }, [ saveSongStatus ]);

  const onCloseSaveSongErrorGrowl = useCallback(() => {
    dispatch(songsSliceFns.clearSaveSongError());
  }, [ dispatch ]);

  const onCloseSaveSongSuccessGrowl = useCallback(() => {
    dispatch(songsSliceFns.clearSaveSongStatus());
  }, [ dispatch ]);

  return (
    <div className={style.SaveChartOption}>
      <Button
        className={style.SaveSongButton}
        onClick={onSaveSong}
        category={ButtonConstants.ButtonCategories.SUCCESS}
      >
        {saveButtonLabel}
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
