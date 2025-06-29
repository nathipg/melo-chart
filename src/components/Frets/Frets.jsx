import { memo, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { ContextMenu } from '../ContextMenu';
import { Fret } from '../Fret';

import {
  addFretAfter,
  addMultiplePitches,
  addFretBefore,
  addMultipleFrets,
  addPitchAtFretBottom,
  addPitchAtFretTop,
  removeFret,
  removePitch,
  removeEmptyFretsAtTheEnd,
  trimPitches,
  addWordsAsNotes,
  getPitchIndexInFret,
} from './functions';

import style from './Frets.module.scss';

const Frets = (props) => {
  const { frets: initialFrets, fretsFnsRef } = props;

  const [ frets, setFrets ] = useState(initialFrets);
  const [ wrapFrets, setWrapFrets ] = useState(true);
  const [ showPitchNumber, setShowPitchNumber ] = useState(false);

  const contextMenuFnsRef = useRef(null);

  const contextMenuItems = useMemo(() => {
    return [
      {
        label: 'Add Pitch Above',
        onClick: (contextMenuData) => {
          addPitchAtFretTop({ contextMenuData, setFrets });
        },
      },
      {
        label: 'Add Pitch Below',
        onClick: (contextMenuData) => {
          addPitchAtFretBottom({ contextMenuData, setFrets });
        },
      },
      {
        label: 'Add Fret Before',
        onClick: (contextMenuData) => {
          addFretBefore({ contextMenuData, setFrets });
        },
      },
      {
        label: 'Add Fret After',
        onClick: (contextMenuData) => {
          addFretAfter({ contextMenuData, setFrets });
        },
      },
      {
        label: 'Remove Fret',
        type: 'danger',
        onClick: (contextMenuData) => {
          removeFret({ contextMenuData, setFrets });
        },
      },
      {
        label: 'Remove Pitch',
        type: 'danger',
        onClick: (contextMenuData) => {
          removePitch({ contextMenuData, setFrets });
        },
      },
    ];
  }, [ setFrets ]);

  useImperativeHandle(fretsFnsRef, () => {
    return {
      setWrapFrets(value) {
        setWrapFrets(value);
      },
      setShowPitchNumber(value) {
        setShowPitchNumber(value);
      },
      getFrets() {
        return [ ...frets ];
      },
      addMultipleFrets(qty) {
        addMultipleFrets({ setFrets, qty });
      },
      addMultiplePitches(qty) {
        addMultiplePitches({ setFrets, qty });
      },
      removeEmptyFretsAtTheEnd() {
        removeEmptyFretsAtTheEnd({ setFrets });
      },
      trimPitches() {
        trimPitches({ setFrets });
      },
      addWordsAsNotes(songText) {
        addWordsAsNotes({ setFrets, songText });
      },
    };
  });

  return (
    <div className={style.FretsContainer} data-wrap-frets={wrapFrets} data-show-pitch-number={showPitchNumber}>
      {frets.map((fret, fretIndex) => {
        const hasNextFret = frets.length > fretIndex + 1;
        const nextFretNoteIndex = hasNextFret ? getPitchIndexInFret(frets[fretIndex + 1]) : null;

        return (
          <Fret
            key={fret.id}
            setFrets={setFrets}
            fret={fret}
            fretIndex={fretIndex}
            hasNextFret={hasNextFret}
            nextFretNoteIndex={nextFretNoteIndex}
            contextMenuFnsRef={contextMenuFnsRef}
          />
        );
      })}

      <ContextMenu
        items={contextMenuItems}
        contextMenuFnsRef={contextMenuFnsRef}
      />
    </div>
  );
};

const FretsMemo = memo(Frets);

export { FretsMemo as Frets };
