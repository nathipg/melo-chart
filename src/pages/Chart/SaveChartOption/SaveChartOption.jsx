import { useCallback, useState } from 'react';

import { Button, ButtonConstants } from '../../../components';
import { songService } from '../../../services';
import { getSongIndexById } from '../functions';

import style from './SaveChartOption.module.scss';

const SaveChartOption = (props) => {
  const { fretsFnsRef, song, songs, setSongs } = props;

  const [ saveState, setSaveState ] = useState(null);

  const onSaveSong = useCallback(async () => {
    const updatedFrets = fretsFnsRef.current?.getFrets();

    const curSongIndex = getSongIndexById(song.id, songs);
    const updatedSong = {
      ...song,
      frets: [
        ...updatedFrets,
      ],
    };

    setSaveState({
      text: 'Saving...',
    });

    const ok = await songService.updateSong(updatedSong);

    if(ok) {
      setSaveState({
        state: 'ok',
        text: 'Saved!',
      });

      setSongs(curSongs => {
        return [
          ...curSongs.slice(0, curSongIndex),
          updatedSong,
          ...curSongs.slice(curSongIndex + 1),
        ];
      });
    } else {
      setSaveState({
        state: 'error',
        text: 'Something went wrong :C',
      });
    }
  }, [ fretsFnsRef, setSongs, song, songs ]);

  return (
    <div className={style.SaveChartOption}>
      <Button
        className={style.SaveSongButton}
        onClick={onSaveSong}
        category={ButtonConstants.ButtonCategories.SUCCESS}
      >
        Save Changes
      </Button>
      {
        saveState ? (
          <span
            className={style.SaveStatusText}
            data-state={saveState.state}
          >
            {saveState.text}
          </span>
        ) : <></>
      }
    </div>
  );
};

export { SaveChartOption };
