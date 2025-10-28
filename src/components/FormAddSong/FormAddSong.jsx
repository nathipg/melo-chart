import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { FieldWithLabel, Input, TextArea } from '@/components';
import { useGrowl } from '@/hooks';
import { SongSlice, UserSlice } from '@/store/slices';
import { isRequestLoading } from '@/utils';

import { generateNewSong } from './functions';

import style from './FormAddSong.module.scss';

const FormAddSong = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  
  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);

  const addSongStatus = useSelector(SongSlice.selectors.selectAddSongStatus);

  const growl = useGrowl();

  const onSubmitForm = useCallback(async (event) => {
    event.preventDefault();

    if(isRequestLoading(addSongStatus)) {
      return;
    }

    const form = event.target;
    const title = form.title.value.trim();
    const pitches = form.pitches.value || 1;
    const lyrics = form.lyrics.value || '';

    if(!title) {
      growl.error(t('Please, insert a song title'));

      return;
    }

    const newSong = generateNewSong({
      title,
      pitches,
      lyrics,
    });

    dispatch(SongSlice.actions.addSong({
      ...newSong,
      editors: [ loggedUser.uid ],
    }));
  }, [ addSongStatus, dispatch, growl, loggedUser, t ]);

  return (
    <form
      id="formAddSong"
      className={style.FormAddSong}
      onSubmit={onSubmitForm}
    >
      <div className={style.FieldsContainer}>
        <FieldWithLabel
          label={t('Title')}
          field={(
            <Input
              type="text"
              name="title"
            />
          )}
        />

        <FieldWithLabel
          label={t('Number of Pitches')}
          field={(
            <Input
              type="number"
              name="pitches"
            />
          )}
        />

        <FieldWithLabel
          label={t('Song lyrics')}
          field={(
            <TextArea
              name="lyrics"
            />
          )}
        />
      </div>
    </form>
  );
};

const FormAddSongMemo = memo(FormAddSong);

export { FormAddSongMemo as FormAddSong };
