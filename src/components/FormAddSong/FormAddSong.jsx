import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { songsSliceActions, songsSliceSelectors, usersSliceSelectors } from '../../store/slices';
import { isRequestLoading } from '../../utils';
import { FieldWithLabel } from '../FieldWithLabel';
import { Input } from '../Input';
import { TextArea } from '../TextArea';

import { generateNewSong } from './functions';

import style from './FormAddSong.module.scss';

const FormAddSong = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  
  const loggedUser = useSelector(usersSliceSelectors.selectLoggedUser);
  const songs = useSelector(songsSliceSelectors.selectAllSongs);

  const addSongStatus = useSelector(songsSliceSelectors.selectAddSongStatus);

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
      dispatch(songsSliceActions.setAddSongError(t('Please, insert a song title')));
      return;
    }

    const isSongAlreadyRegistered = songs.some(song => song.title == title);

    if(isSongAlreadyRegistered) {
      dispatch(songsSliceActions.setAddSongError(t('This song already exist')));
      return;
    }

    const newSong = generateNewSong({
      title,
      pitches,
      lyrics,
    });

    dispatch(songsSliceActions.addSong({
      loggedUser,
      song: newSong,
    }));
  }, [ addSongStatus, dispatch, loggedUser, songs, t ]);

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
