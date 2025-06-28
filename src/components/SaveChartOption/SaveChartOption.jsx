import { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants } from '..';
import { songsSliceFns } from '../../store/slices/song-slice';
import { isRequestLoading } from '../../utils';

import style from './SaveChartOption.module.scss';

const SaveChartOption = (props) => {
  const { fretsFnsRef, song } = props;

  const dispatch = useDispatch();

  const saveSongStatus = useSelector(songsSliceFns.selectSaveSongStatus);
  const saveSongError = useSelector(songsSliceFns.selectSaveSongError);

  const onSaveSong = useCallback(async () => {
    const updatedFrets = fretsFnsRef.current?.getFrets();

    dispatch(songsSliceFns.saveSong({
      ...song,
      frets: updatedFrets,
    }));
  }, [ dispatch, fretsFnsRef, song ]);

  const saveButtonLabel = useMemo(() => {
    return isRequestLoading(saveSongStatus) ? 'Saving Changes...' : 'Save Changes';
  }, [ saveSongStatus ]);

  return (
    <div className={style.SaveChartOption}>
      <Button
        className={style.SaveSongButton}
        onClick={onSaveSong}
        category={ButtonConstants.ButtonCategories.SUCCESS}
      >
        {saveButtonLabel}
      </Button>
      {
        saveSongError ? (
          <span className={style.SaveStatusText}>
            {saveSongError}
          </span>
        ) : <></>
      }
    </div>
  );
};

const SaveChartOptionMemo = memo(SaveChartOption);

export { SaveChartOptionMemo as SaveChartOption };
