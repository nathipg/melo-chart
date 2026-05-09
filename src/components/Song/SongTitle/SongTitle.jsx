import { useAbly, useChannel } from 'ably/react';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Checkbox, Input, SaveChartOption } from '@/components';
import { SOCKET_CHANNEL, SOCKET_EVENT_NAME_MAPPER } from '@/constants';
import { SongSlice } from '@/store/slices';

import style from './SongTitle.module.scss';

const SongTitle = (props) => {
  const { id, title: originalTitle, notesFnsRef, setChangesLog } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const ably = useAbly();

  const [ editMode, setEditMode ] = useState(false);
  const [ title, setTitle ] = useState(originalTitle);

  const updateSongTitle = useCallback((data) => {
    setTitle(data.title);
    dispatch(SongSlice.actions.editSongTitle({
      id: data.id,
      title: data.title,
    }));
  }, [ dispatch ]);

  const { publish } = useChannel(SOCKET_CHANNEL, (message) => {
    if(ably.connection.id != message.connectionId) {
      const { name, data } = message;

      if(name == SOCKET_EVENT_NAME_MAPPER.UPDATE_SONG_TITLE) {
        updateSongTitle(data);
        return;
      }

      if(name == SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_CHANGES_LOG) {
        data.changesLog?.forEach(changeLog => {
          const { action, data } = changeLog;

          if(action == SOCKET_EVENT_NAME_MAPPER.UPDATE_SONG_TITLE) {
            updateSongTitle(data);
            return;
          }
        });

        return;
      }
    }
  });

  const onDoubleClickTitle = useCallback(() => {
    setEditMode(true);
  }, []);

  const onKeyDownInput = useCallback((event) => {
    if(event.key === 'Enter') {
      event.target.blur();
    }
  }, []);

  const onBlurInput = useCallback(() => {
    setEditMode(false);

    const publishData = {
      id,
      title,
    };

    setChangesLog((currentChangesLog) => {
      return [
        ...currentChangesLog,
        {
          action: SOCKET_EVENT_NAME_MAPPER.UPDATE_SONG_TITLE,
          data: publishData,
        },
      ];
    });

    publish(SOCKET_EVENT_NAME_MAPPER.UPDATE_SONG_TITLE, publishData);

    dispatch(SongSlice.actions.editSongTitle({
      id,
      title,
    }));
  }, [ dispatch, id, publish, setChangesLog, title ]);

  const onChangeWrapCheckbox = useCallback((value) => {
    notesFnsRef.current?.setWrapNotes(value);
  }, [ notesFnsRef ]);

  return (
    <>
      {
        editMode ? (
          <Input
            autoFocus
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onKeyDown={onKeyDownInput}
            onBlur={onBlurInput}
          />
        ) : (
          <>
            <h2
              className={style.SongTitle}
              onDoubleClick={onDoubleClickTitle}
            >
              {title}
            </h2>
            <SaveChartOption
              songId={id}
              notesFnsRef={notesFnsRef}
              setChangesLog={setChangesLog}
            />

            <Checkbox
              className={style.CheckboxContainer}
              label={t('Break Chart')}
              initialValue={true}
              onChange={onChangeWrapCheckbox}
            />
          </>
        )
      }
    </>
  );
};

const SongTitleMemo = memo(SongTitle);

export { SongTitleMemo as SongTitle };
