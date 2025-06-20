import { useCallback } from 'react';

import { Button } from '../Button';

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

    setSongs(curSongs => {
      return [
        ...curSongs,
        generateNewSong(title),
      ];
    });
  }, [ setSongs, songs ]);

  return (
    <form className={style.FormAddSong} onSubmit={onSubmitForm}>
      <h2>Add Song</h2>

      <label>
        <span>Title</span>

        <input type="text" name="title" />
      </label>

      <div>
        <Button>Add</Button>
      </div>
    </form>
  );
};

export { FormAddSong };
