import { memo, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useBlocker, useSearchParams } from 'react-router';

import { Button, ButtonConstants, ChartControllers, ConfirmationDialog, LoadingIcon, Song } from '../../components';
import { REQUEST_STATUS } from '../../constants';
import { songsSliceFns } from '../../store/slices';

import style from './Chart.module.scss';

const Chart = () => {
  const { t } = useTranslation();

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
      [REQUEST_STATUS.LOADING]: (
        <div>
          <LoadingIcon /> <span>{t('Loading...')}</span>
        </div>
      ),
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
          <span>{t('Song not found')}</span>
        )
      ),
    };
  }, [ onAddMultipleNotes, onAddMultiplePitches, onAddWordsAsNotes, onRemoveEmptyNotesAtTheEnd, onTrimPitches, song, songsError, t ]);

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
                <p>{t('Are you sure you want to leave this page?')}</p>
                <p>{t('Some unsaved changes will be lost')}</p>
              </>
            )}
            footerContent={(
              <>
                <Button
                  category={ButtonConstants.ButtonCategories.DANGER}
                  onClick={() => blocker.proceed()}
                >
                  {t('Leave Page')}
                </Button>
                <Button
                  category={ButtonConstants.ButtonCategories.DEFAULT}
                  onClick={() => blocker.reset()}
                >
                  {t('Cancel')}
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
