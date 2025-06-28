import { memo, useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

import { ChartControllers, Song } from '../../components';
import { REQUEST_STATUS } from '../../constants';
import { songsSliceFns } from '../../store/slices/song-slice';

import style from './Chart.module.scss';

const Chart = () => {
  const songsStatus = useSelector(songsSliceFns.selectSongsStatus);
  const songsError = useSelector(songsSliceFns.selectSongsError);

  const fretsFnsRef = useRef(null);

  const onAddMultipleFrets = useCallback((qty) => {
    fretsFnsRef.current?.addMultipleFrets(qty);
  }, []);

  const onAddMultipleStrings = useCallback((qty) => {
    fretsFnsRef.current?.addMultipleStrings(qty);
  }, []);

  const onTrimStrings = useCallback(() => {
    fretsFnsRef.current?.trimStrings();
  }, []);

  const onRemoveEmptyFretsAtTheEnd = useCallback(() => {
    fretsFnsRef.current?.removeEmptyFretsAtTheEnd();
  }, []);

  const onAddWordsAsNotes = useCallback((songText) => {
    fretsFnsRef.current?.addWordsAsNotes(songText);
  }, []);

  const CONTENT_MAPPER = useMemo(() => {
    return {
      [REQUEST_STATUS.LOADING]: <span>Loading...</span>,
      [REQUEST_STATUS.FAILED]: <span>{songsError}</span>,
      [REQUEST_STATUS.SUCCEEDED]: (
        <>
          <ChartControllers
            onAddMultipleFrets={onAddMultipleFrets}
            onAddMultipleStrings={onAddMultipleStrings}
            onTrimStrings={onTrimStrings}
            onRemoveEmptyFretsAtTheEnd={onRemoveEmptyFretsAtTheEnd}
            onAddWordsAsNotes={onAddWordsAsNotes}
          />
    
          <Song fretsFnsRef={fretsFnsRef} />
        </>
      ),
    };
  }, [ onAddMultipleFrets, onAddMultipleStrings, onAddWordsAsNotes, onRemoveEmptyFretsAtTheEnd, onTrimStrings, songsError ]);

  return (
    <div className={style.Chart}>
      {CONTENT_MAPPER[songsStatus]}
    </div>
  );
};

const ChartMemo = memo(Chart);

export { ChartMemo as Chart };
