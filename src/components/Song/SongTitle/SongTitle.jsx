import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Checkbox, SaveChartOption } from '../..';
import { songsSliceActions } from '../../../store/slices';
import { Input } from '../../Input';

import style from './SongTitle.module.scss';

const SongTitle = (props) => {
  const { id, title: originalTitle, notesFnsRef } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [ editMode, setEditMode ] = useState(false);
  const [ title, setTitle ] = useState(originalTitle);

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

    dispatch(songsSliceActions.editSongTitle({
      id,
      title,
    }));
  }, [ dispatch, id, title ]);

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
