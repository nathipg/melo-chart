import { memo, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useBlocker, useSearchParams } from 'react-router';

import { GenerateChartDialog, LeaveChartPageConfirmDialog, Song } from '@/components';
import { SongSlice } from '@/store/slices';

import style from './Chart.module.scss';

const Chart = () => {
  const notesFnsRef = useRef(null);
  const generateChartDialogFnsRef = useRef(null);

  const [ searchParams ] = useSearchParams();

  const songId = searchParams.get('id') || null;

  const song = useSelector(SongSlice.selectors.selectSongById(songId));

  const onAddWordsAsNotes = useCallback((songText) => {
    notesFnsRef.current?.addWordsAsNotes(songText);
  }, []);


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
      {
        song ? (
          <Song
            notesFnsRef={notesFnsRef}
            generateChartDialogFnsRef={generateChartDialogFnsRef}
            song={song}
          />
        ) : (
          <Navigate to="/" />
        )
      }

      <LeaveChartPageConfirmDialog
        show={blocker.state === 'blocked'}
        onConfirm={() => blocker.proceed()}
        onCancel={() => blocker.reset()}
      />

      <GenerateChartDialog
        generateChartDialogFnsRef={generateChartDialogFnsRef}
        onAddWordsAsNotes={onAddWordsAsNotes}
        songId={song?.id}
      />
    </div>
  );
};

const ChartMemo = memo(Chart);

export { ChartMemo as Chart };
