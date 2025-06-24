import { DragDropContext } from '@hello-pangea/dnd';
import { memo, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { ContextMenu } from '../ContextMenu';
import { Fret } from '../Fret';

import {
  addFretAfter,
  addMultipleStrings,
  addFretBefore,
  addMultipleFrets,
  addStringAtFretBottom,
  addStringAtFretTop,
  loadOnDragEnd,
  removeFret,
  removeString,
  removeEmptyFretsAtTheEnd,
  trimStrings,
  addWordsAsNotes,
  getNoteIndexInFret,
} from './functions';

import style from './Frets.module.scss';

const Frets = (props) => {
  const { frets: initialFrets, fretsFnsRef } = props;

  const [ frets, setFrets ] = useState(initialFrets);
  const [ wrapFrets, setWrapFrets ] = useState(true);
  const [ showStringNumber, setShowStringNumber ] = useState(false);

  const contextMenuFnsRef = useRef(null);

  const contextMenuItems = useMemo(() => {
    return [
      {
        label: 'Add String Above',
        onClick: (contextMenuData) => {
          addStringAtFretTop({ contextMenuData, setFrets });
        },
      },
      {
        label: 'Add String Below',
        onClick: (contextMenuData) => {
          addStringAtFretBottom({ contextMenuData, setFrets });
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
        label: 'Remove String',
        type: 'danger',
        onClick: (contextMenuData) => {
          removeString({ contextMenuData, setFrets });
        },
      },
    ];
  }, [ setFrets ]);

  useImperativeHandle(fretsFnsRef, () => {
    return {
      setWrapFrets(value) {
        setWrapFrets(value);
      },
      setShowStringNumber(value) {
        setShowStringNumber(value);
      },
      getFrets() {
        return [ ...frets ];
      },
      addMultipleFrets(qty) {
        addMultipleFrets({ setFrets, qty });
      },
      addMultipleStrings(qty) {
        addMultipleStrings({ setFrets, qty });
      },
      removeEmptyFretsAtTheEnd() {
        removeEmptyFretsAtTheEnd({ setFrets });
      },
      trimStrings() {
        trimStrings({ setFrets });
      },
      addWordsAsNotes(songText) {
        addWordsAsNotes({ setFrets, songText });
      },
    };
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDragEnd = useCallback(loadOnDragEnd(setFrets), [ setFrets ]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={style.FretsContainer} data-wrap-frets={wrapFrets} data-show-string-number={showStringNumber}>
        {frets.map((fret, fretIndex) => {
          const hasNextFret = frets.length > fretIndex + 1;
          const nextFretNoteIndex = hasNextFret ? getNoteIndexInFret(frets[fretIndex + 1]) : null;

          return (
            <Fret
              key={fret.id}
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
    </DragDropContext>
  );
};

const FretsMemo = memo(Frets);

export { FretsMemo as Frets };
