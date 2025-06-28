import { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { REQUEST_STATUS } from '../../constants';
import { songsSliceFns } from '../../store/slices/song-slice';
import { isRequestLoading } from '../../utils';
import { Button, ButtonConstants } from '../Button';
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
            {
              addSongError ? (
                <span>{addSongError}</span>
              ) : <></>
            }
          </>
        </>
      ),
    };
  }, [ addSongError, addSongStatus, songsError ]);

  const onSubmitForm = useCallback(async (event) => {
    event.preventDefault();

    if(isRequestLoading(addSongStatus)) {
      return;
    }

    const titleInput = event.target.title;
    const title = titleInput.value.trim();

    if(!title) {
      return;
    }

    const isSongAlreadyRegistered = songs.some(song => song.title == title);

    if(isSongAlreadyRegistered) {
      return;
    }

    titleInput.value = '';

    const newSong = generateNewSong(title);

    dispatch(songsSliceFns.addSong({
      song: newSong,
    }));
  }, [ addSongStatus, dispatch, songs ]);

  return (
    <form className={style.FormAddSong} onSubmit={onSubmitForm}>
      <h2>Add Song</h2>

      <div className={style.FieldsContainer}>
        {CONTENT_MAPPER[songsStatus]}
      </div>
    </form>
  );
};

const FormAddSongMemo = memo(FormAddSong);

export { FormAddSongMemo as FormAddSong };
