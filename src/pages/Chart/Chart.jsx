import { useCallback, useMemo, useRef } from 'react';
import { Navigate, useSearchParams } from 'react-router';

import { ChartControllers, Song } from '../../components';

import { getSongById } from './functions';
import { SaveChartOption } from './SaveChartOption';

import style from './Chart.module.scss';

const Chart = (props) => {
  const { songs, setSongs } = props;

  const [ searchParams ] = useSearchParams();
  const songId = searchParams.get('id') || null;

  const fretsFnsRef = useRef(null);

  const song = useMemo(() => {
    return songId ? getSongById(songId, songs) : null;
  }, [ songId, songs ]);

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

  const onAddWordsAsNotes = useCallback((songText) => {
    fretsFnsRef.current?.addWordsAsNotes(songText);
  }, []);

  if(!songId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={style.Chart}>
      {
        song ? (
          <>
            <ChartControllers
              onAddMultipleFrets={onAddMultipleFrets}
              onAddMultipleStrings={onAddMultipleStrings}
              onTrimStrings={onTrimStrings}
              onRemoveEmptyFretsAtTheEnd={onRemoveEmptyFretsAtTheEnd}
              onAddWordsAsNotes={onAddWordsAsNotes}
            />

            <SaveChartOption
              song={song}
              songs={songs}
              setSongs={setSongs}
              fretsFnsRef={fretsFnsRef}
            />
      
            <Song
              song={song}
              fretsFnsRef={fretsFnsRef}
            />
          </>
        ) : (
          <p>Song not found</p>
        )
      }
    </div>
  );
};

export { Chart };
