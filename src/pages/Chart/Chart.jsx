import { memo, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useBlocker, useSearchParams } from 'react-router';

import { GenerateChartDialog, LeaveChartPageConfirmDialog, LoadingIcon, Song } from '../../components';
import { REQUEST_STATUS } from '../../constants';
import { songsSliceSelectors } from '../../store/slices';

import style from './Chart.module.scss';

const Chart = () => {
  const { t } = useTranslation();

  const songsStatus = useSelector(songsSliceSelectors.selectSongsStatus);
  const songsError = useSelector(songsSliceSelectors.selectSongsError);

  const notesFnsRef = useRef(null);
  const generateChartDialogFnsRef = useRef(null);

  const [ searchParams ] = useSearchParams();

  const songId = searchParams.get('id') || null;

  const song = useSelector(songsSliceSelectors.selectSongById(songId));

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
          <Song
            notesFnsRef={notesFnsRef}
            generateChartDialogFnsRef={generateChartDialogFnsRef}
            song={song}
          />
        ) : (
          <span>{t('Song not found')}</span>
        )
      ),
    };
  }, [ song, songsError, t ]);

  const shouldConfirmLeavePage = useCallback(() => {
    if(!song) {
      return false;
    }
    
    const notesStringified = JSON.stringify(song.notes);
    const updateNotes = notesFnsRef.current?.getNotes() || [];
    const updateNotesStringified = JSON.stringify(updateNotes);

    return notesStringified != updateNotesStringified;
  }, [ song, notesFnsRef ]);

  const blocker = useBlocker(shouldConfirmLeavePage);

  return (
    <div className={style.Chart}>
      {CONTENT_MAPPER[songsStatus]}

      <LeaveChartPageConfirmDialog
        show={blocker.state === 'blocked'}
        onConfirm={() => blocker.proceed()}
        onCancel={() => blocker.reset()}
      />

      <GenerateChartDialog
        generateChartDialogFnsRef={generateChartDialogFnsRef}
        show={song?.isNewSong}
        onAddWordsAsNotes={onAddWordsAsNotes}
      />
    </div>
  );
};

const ChartMemo = memo(Chart);

export { ChartMemo as Chart };
