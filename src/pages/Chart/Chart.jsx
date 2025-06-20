import { useCallback, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router';

import { Checkbox, Frets } from '../../components';

const Chart = (props) => {
  const { songs } = props;

  const [ searchParams, _ ] = useSearchParams();

  const fretsFnsRef = useRef(null);

  const song = useMemo(() => {
    return songs.find((song) => song.id == searchParams.get('id'));
  }, [ searchParams, songs ]);

  const onChangeWrapCheckbox = useCallback((value) => {
    fretsFnsRef.current?.setWrapFrets(value);
  }, []);

  return (
    <div>
      <Checkbox
        label="Wrap"
        initialValue={true}
        onChange={onChangeWrapCheckbox}
      />
      
      <br />

      <h2>{song.title}</h2>

      <Frets
        frets={song.frets}
        fretsFnsRef={fretsFnsRef}
      />
    </div>
  );
};

export { Chart };
