import { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { REQUEST_STATUS } from '../../constants';
import { songsSliceFns } from '../../store/slices';
import { isRequestLoading } from '../../utils';
import { Button, ButtonConstants } from '../Button';
import { GrowlFns } from '../Growl';
import { InlineInput } from '../InlineInput';

import { generateNewSong } from './functions';

import style from './FormAddSong.module.scss';

const FormAddSong = () => {
  const dispatch = useDispatch();
  
  const songs = useSelector(songsSliceFns.selectAllSongs);
  const songsStatus = useSelector(songsSliceFns.selectSongsStatus);
  const songsError = useSelector(songsSliceFns.selectSongsError);

  const addSongStatus = useSelector(songsSliceFns.selectAddSongStatus);
  const addSongError = useSelector(songsSliceFns.selectAddSongError);

  const CONTENT_MAPPER = useMemo(() => {
    return {
      [REQUEST_STATUS.LOADING]: <span>Loading...</span>,
      [REQUEST_STATUS.FAILED]: <span>{songsError}</span>,
      [REQUEST_STATUS.SUCCEEDED]: (
        <>
          <>
            <InlineInput
              label="Title"
              type="text"
              name="title"
            />
    
            <Button category={ButtonConstants.ButtonCategories.SUCCESS}>
                Add{isRequestLoading(addSongStatus) ? 'ing...' : ''}
            </Button>
          </>
        </>
      ),
    };
  }, [ addSongStatus, songsError ]);

  const onSubmitForm = useCallback(async (event) => {
    event.preventDefault();

    if(isRequestLoading(addSongStatus)) {
      return;
    }

    const titleInput = event.target.title;
    const title = titleInput.value.trim();

    if(!title) {
      dispatch(songsSliceFns.setAddSongError('Please, insert a song title'));
      return;
    }

    const isSongAlreadyRegistered = songs.some(song => song.title == title);

    if(isSongAlreadyRegistered) {
      dispatch(songsSliceFns.setAddSongError('This song already exist'));
      return;
    }

    titleInput.value = '';

    const newSong = generateNewSong(title);

    dispatch(songsSliceFns.addSong({
      song: newSong,
    }));
  }, [ addSongStatus, dispatch, songs ]);

  const onCloseAddSongErrorGrowl = useCallback(() => {
    dispatch(songsSliceFns.clearAddSongError());
  }, [ dispatch ]);

  const onCloseAddSongSuccessGrowl = useCallback(() => {
    dispatch(songsSliceFns.clearAddSongStatus());
  }, [ dispatch ]);

  return (
    <form className={style.FormAddSong} onSubmit={onSubmitForm}>
      <h2>Add Song</h2>

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
