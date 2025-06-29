import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { REQUEST_STATUS } from '../../constants';
import { songsSliceActions, songsSliceSelectors } from '../../store/slices';
import { isRequestLoading } from '../../utils';
import { Button, ButtonConstants } from '../Button';
import { GrowlFns } from '../Growl';
import { LoadingIcon } from '../Icons';
import { InlineInput } from '../InlineInput';

import { generateNewSong } from './functions';

import style from './FormAddSong.module.scss';

const FormAddSong = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  
  const songs = useSelector(songsSliceSelectors.selectAllSongs);
  const songsStatus = useSelector(songsSliceSelectors.selectSongsStatus);
  const songsError = useSelector(songsSliceSelectors.selectSongsError);

  const addSongStatus = useSelector(songsSliceSelectors.selectAddSongStatus);
  const addSongError = useSelector(songsSliceSelectors.selectAddSongError);

  const CONTENT_MAPPER = useMemo(() => {
    return {
      [REQUEST_STATUS.LOADING]: (
        <div>
          <LoadingIcon /> <span>{t('Loading...')}</span>
        </div>
      ),
      [REQUEST_STATUS.FAILED]: <span>{songsError}</span>,
      [REQUEST_STATUS.SUCCEEDED]: (
        <>
          <>
            <InlineInput
              label={t('Title')}
              type="text"
              name="title"
            />
    
            <Button category={ButtonConstants.ButtonCategories.SUCCESS}>
              {isRequestLoading(addSongStatus) ? <LoadingIcon /> : <></>}
              {t('Add')}
            </Button>
          </>
        </>
      ),
    };
  }, [ addSongStatus, songsError, t ]);

  const onSubmitForm = useCallback(async (event) => {
    event.preventDefault();

    if(isRequestLoading(addSongStatus)) {
      return;
    }

    const titleInput = event.target.title;
    const title = titleInput.value.trim();

    if(!title) {
      dispatch(songsSliceActions.setAddSongError(t('Please, insert a song title')));
      return;
    }

    const isSongAlreadyRegistered = songs.some(song => song.title == title);

    if(isSongAlreadyRegistered) {
      dispatch(songsSliceActions.setAddSongError(t('This song already exist')));
      return;
    }

    titleInput.value = '';

    const newSong = generateNewSong(title);

    dispatch(songsSliceActions.addSong({
      song: newSong,
    }));
  }, [ addSongStatus, dispatch, songs, t ]);

  const onCloseAddSongErrorGrowl = useCallback(() => {
    dispatch(songsSliceActions.clearAddSongError());
  }, [ dispatch ]);

  const onCloseAddSongSuccessGrowl = useCallback(() => {
    dispatch(songsSliceActions.clearAddSongStatus());
  }, [ dispatch ]);

  return (
    <form className={style.FormAddSong} onSubmit={onSubmitForm}>
      <h2>{t('Add Song')}</h2>

      <div className={style.FieldsContainer}>
        {CONTENT_MAPPER[songsStatus]}
      </div>

      {GrowlFns.renderSavedGrowl({
        requestStatus: addSongStatus,
        onCloseGrowl: onCloseAddSongSuccessGrowl,
      })}

      {GrowlFns.renderErrorGrowl({
        message: addSongError,
        onCloseGrowl: onCloseAddSongErrorGrowl,
      })}
    </form>
  );
};

const FormAddSongMemo = memo(FormAddSong);

export { FormAddSongMemo as FormAddSong };
