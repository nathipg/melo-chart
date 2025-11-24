import { useAbly, useChannel } from 'ably/react';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Checkbox, Input, SaveChartOption } from '@/components';
import { SongSlice } from '@/store/slices';

import style from './SongTitle.module.scss';

const SongTitle = (props) => {
  const { id, title: originalTitle, notesFnsRef } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const ably = useAbly();

  const [ editMode, setEditMode ] = useState(false);
  const [ title, setTitle ] = useState(originalTitle);

  const { publish } = useChannel('melo-chart-song-updates', (message) => {
    if(ably.connection.id != message.connectionId) {
      const { name, data } = message;

      if(name == 'update-song-title') {
        setTitle(data.title);
        dispatch(SongSlice.actions.editSongTitle({
          id: data.id,
          title: data.title,
        }));
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

    publish('update-song-title', {
      id,
      title,
    });

    dispatch(SongSlice.actions.editSongTitle({
      id,
      title,
    }));
  }, [ dispatch, id, publish, title ]);

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
