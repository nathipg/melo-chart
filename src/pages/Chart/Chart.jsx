import { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useBlocker, useSearchParams } from 'react-router';

import { GenerateChartDialog, LeaveChartPageConfirmDialog, Song } from '@/components';
import { SongSlice } from '@/store/slices';

import style from './Chart.module.scss';

const Chart = () => {
  const { t } = useTranslation();
  
  const notesFnsRef = useRef(null);
  const generateChartDialogFnsRef = useRef(null);

  const [ searchParams ] = useSearchParams();

  const songId = searchParams.get('id') || null;

  const song = useSelector(SongSlice.selectors.selectSongById(songId));
  const isSongsLoaded = useSelector(SongSlice.selectors.selectIsSongsLoaded);

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
          <div>{isSongsLoaded ? t('Song not found') : t('Loading...')}</div>
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
      />
    </div>
  );
};

const ChartMemo = memo(Chart);

export { ChartMemo as Chart };
