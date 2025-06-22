import { useCallback, useMemo, useRef } from 'react';
import { Navigate, useSearchParams } from 'react-router';

import { ChartControllers, SaveChartOption, Song } from '../../components';

import { getSongById, getSongIndexById } from './functions';

import style from './Chart.module.scss';

const Chart = (props) => {
  const { songs, setSongs } = props;

  const [ searchParams ] = useSearchParams();
  const songId = searchParams.get('id') || null;

  const fretsFnsRef = useRef(null);

  const song = useMemo(() => {
    return songId ? getSongById(songId, songs) : null;
  }, [ songId, songs ]);

  const onSaveSong = useCallback(() => {
    const updatedFrets = fretsFnsRef.current?.getFrets();

    setSongs(curSongs => {
      const curSong = getSongById(song.id, songs);
      const curSongIndex = getSongIndexById(song.id, songs);
      const updatedSong = {
        ...curSong,
        frets: [
          ...updatedFrets,
        ],
      };

      return [
        ...curSongs.slice(0, curSongIndex),
        updatedSong,
        ...curSongs.slice(curSongIndex + 1),
      ];
    });
  }, [ setSongs, song, songs ]);

  const onAddMultipleFrets = useCallback((qty) => {
    fretsFnsRef.current?.addMultipleFrets(qty);
  }, []);

  const onAddMultipleStrings = useCallback((qty) => {
    fretsFnsRef.current?.addMultipleStrings(qty);
  }, []);

  const onTrimStrings = useCallback(() => {
    fretsFnsRef.current?.trimStrings();
  }, []);

  const onRemoveEmptyFretsAtTheEnd = useCallback(() => {
    fretsFnsRef.current?.removeEmptyFretsAtTheEnd();
  }, []);

  if(!song) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={style.Chart}>
      <ChartControllers
        onAddMultipleFrets={onAddMultipleFrets}
        onAddMultipleStrings={onAddMultipleStrings}
        onTrimStrings={onTrimStrings}
        onRemoveEmptyFretsAtTheEnd={onRemoveEmptyFretsAtTheEnd}
      />

      <SaveChartOption
        onSaveSong={onSaveSong}
      />
      
      <Song
        song={song}
        fretsFnsRef={fretsFnsRef}
      />
    </div>
  );
};

export { Chart };
