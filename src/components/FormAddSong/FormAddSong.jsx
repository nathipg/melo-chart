import { useCallback } from 'react';

import { songService } from '../../services';
import { Button, ButtonConstants } from '../Button';
import { InlineInput } from '../InlineInput/InlineInput';

import { generateNewSong } from './functions';

import style from './FormAddSong.module.scss';

const FormAddSong = (props) => {
  const { songs, setSongs } = props;

  const onSubmitForm = useCallback((event) => {
    event.preventDefault();

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

    const ok = songService.addSong(newSong);

    if(ok) {
      setSongs(curSongs => {
        return [
          ...curSongs,
          newSong,
        ];
      });
    }
  }, [ setSongs, songs ]);

  return (
    <form className={style.FormAddSong} onSubmit={onSubmitForm}>
      <h2>Add Song</h2>

      <div className={style.FieldsContainer}>
        <InlineInput
          label="Title"
          type="text"
          name="title"
        />

        <Button category={ButtonConstants.ButtonCategories.SUCCESS}>Add</Button>
      </div>
    </form>
  );
};

export { FormAddSong };
