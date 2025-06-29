import { memo, useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';

import { ChartControllers, Song } from '../../components';
import { REQUEST_STATUS } from '../../constants';
import { songsSliceFns } from '../../store/slices';

import style from './Chart.module.scss';

const Chart = () => {
  const songsStatus = useSelector(songsSliceFns.selectSongsStatus);
  const songsError = useSelector(songsSliceFns.selectSongsError);

  const notesFnsRef = useRef(null);

  const [ searchParams ] = useSearchParams();

  const songId = searchParams.get('id') || null;

  const song = useSelector(songsSliceFns.selectSongById(songId));

  const onAddMultipleNotes = useCallback((qty) => {
    notesFnsRef.current?.addMultipleNotes(qty);
  }, []);

  const onAddMultiplePitches = useCallback((qty) => {
    notesFnsRef.current?.addMultiplePitches(qty);
  }, []);

  const onTrimPitches = useCallback(() => {
    notesFnsRef.current?.trimPitches();
  }, []);

  const onRemoveEmptyNotesAtTheEnd = useCallback(() => {
    notesFnsRef.current?.removeEmptyNotesAtTheEnd();
  }, []);

  const onAddWordsAsNotes = useCallback((songText) => {
    notesFnsRef.current?.addWordsAsNotes(songText);
  }, []);

  const CONTENT_MAPPER = useMemo(() => {
    return {
      [REQUEST_STATUS.LOADING]: <span>Loading...</span>,
      [REQUEST_STATUS.FAILED]: <span>{songsError}</span>,
      [REQUEST_STATUS.SUCCEEDED]: (
        song ? (
          <>
            <ChartControllers
              onAddMultipleNotes={onAddMultipleNotes}
              onAddMultiplePitches={onAddMultiplePitches}
              onTrimPitches={onTrimPitches}
              onRemoveEmptyNotesAtTheEnd={onRemoveEmptyNotesAtTheEnd}
              onAddWordsAsNotes={onAddWordsAsNotes}
            />
    
            <Song
              notesFnsRef={notesFnsRef}
              song={song}
            />
          </>
        ) : (
          <span>Song not found</span>
        )
      ),
    };
  }, [ onAddMultipleNotes, onAddMultiplePitches, onAddWordsAsNotes, onRemoveEmptyNotesAtTheEnd, onTrimPitches, song, songsError ]);

  return (
    <div className={style.Chart}>
      {CONTENT_MAPPER[songsStatus]}
    </div>
  );
};

const ChartMemo = memo(Chart);

export { ChartMemo as Chart };
