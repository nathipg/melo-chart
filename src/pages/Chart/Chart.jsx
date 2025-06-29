import { memo, useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useBlocker, useSearchParams } from 'react-router';

import { Button, ButtonConstants, ChartControllers, ConfirmationDialog, Song } from '../../components';
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

  const shouldConfirmLeavePage = useCallback(() => {
    const notesStringified = JSON.stringify(song.notes);
    const updateNotes = notesFnsRef.current?.getNotes() || [];
    const updateNotesStringified = JSON.stringify(updateNotes);

    return notesStringified != updateNotesStringified;
  }, [ song, notesFnsRef ]);

  const blocker = useBlocker(shouldConfirmLeavePage);

  return (
    <div className={style.Chart}>
      {blocker.state === 'blocked' ? (
        <>
          <ConfirmationDialog
            bodyContent={(
              <>
                <p>Are you sure you want to leave this page?</p>
                <p>Some unsaved changes will be lost</p>
              </>
            )}
            footerContent={(
              <>
                <Button
                  category={ButtonConstants.ButtonCategories.DANGER}
                  onClick={() => blocker.proceed()}
                >
                  Leave Page
                </Button>
                <Button
                  category={ButtonConstants.ButtonCategories.DEFAULT}
                  onClick={() => blocker.reset()}
                >
                  Cancel
                </Button>
              </>
            )}
          />
        </>
      ) : <></>}

      {CONTENT_MAPPER[songsStatus]}
    </div>
  );
};

const ChartMemo = memo(Chart);

export { ChartMemo as Chart };
