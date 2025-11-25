import { useAbly, useChannel } from 'ably/react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useBlocker, useSearchParams } from 'react-router';

import { GenerateChartDialog, LeaveChartPageConfirmDialog, Song } from '@/components';
import { SOCKET_CHANNEL, SOCKET_EVENT_NAME_MAPPER } from '@/constants';
import { SongSlice } from '@/store/slices';

import style from './Chart.module.scss';

const Chart = () => {
  const { t } = useTranslation();
  
  const notesFnsRef = useRef(null);
  const generateChartDialogFnsRef = useRef(null);
  const hasRequestedChanges = useRef(false);

  const [ searchParams ] = useSearchParams();

  const songId = searchParams.get('id') || null;

  const song = useSelector(SongSlice.selectors.selectSongById(songId));
  const isSongsLoaded = useSelector(SongSlice.selectors.selectIsSongsLoaded);

  const [ changesLog, setChangesLog ] = useState([]);

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

  const ably = useAbly();
  
  const { publish } = useChannel(SOCKET_CHANNEL, (message) => {
    if(ably.connection.id != message.connectionId) {
      const { name, data } = message;
      
      if(data.id != songId) {
        return;
      }

      if(name == SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_REQUEST_CHANGES) {
        publish(SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_CHANGES_LOG, {
          id: songId,
          changesLog,
        });
        return;
      }

      if(name == SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_CHANGES_LOG) {
        setChangesLog(data.changesLog);
        return;
      }
    }
  });

  useEffect(() => {
    if(!hasRequestedChanges.current) {
      publish(SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_REQUEST_CHANGES, {
        id: songId,
      });

      hasRequestedChanges.current = true;
    }
  }, [ publish, songId ]);

  return (
    <div className={style.Chart}>
      {
        song ? (
          <Song
            notesFnsRef={notesFnsRef}
            generateChartDialogFnsRef={generateChartDialogFnsRef}
            song={song}
            setChangesLog={setChangesLog}
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
        songId={song?.id}
        setChangesLog={setChangesLog}
      />
    </div>
  );
};

const ChartMemo = memo(Chart);

export { ChartMemo as Chart };
