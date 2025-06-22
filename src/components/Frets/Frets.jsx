import { DragDropContext } from '@hello-pangea/dnd';
import { useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { ContextMenu } from '../ContextMenu';
import { Fret } from '../Fret';
import { FretChunk } from '../FretChunk';

import {
  addFretAfter,
  addMultipleStrings,
  addFretBefore,
  addMultipleFrets,
  addStringAtFretBottom,
  addStringAtFretTop,
  getNoteIndexInFret,
  loadOnDragEnd,
  loadOnEditFretChunkText,
  removeFret,
  removeString,
  shouldAddRightBorderOnFretChunk,
  removeEmptyFretsAtTheEnd,
  trimStrings,
} from './functions';

import style from './Frets.module.scss';

const Frets = (props) => {
  const { frets: initialFrets, fretsFnsRef } = props;

  const [ frets, setFrets ] = useState(initialFrets);
  const [ wrapFrets, setWrapFrets ] = useState(false);

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
    };
  });

  const onOpenContextMenu = useCallback((data) => {
    contextMenuFnsRef.current?.setContextMenuData(data);
  }, [ contextMenuFnsRef ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDragEnd = useCallback(loadOnDragEnd(setFrets), [ setFrets ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onEditFretChunkText = useCallback(loadOnEditFretChunkText(setFrets), [ setFrets ]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={style.FretsContainer} data-wrap-frets={wrapFrets}>
        {frets.map((fret, fretIndex) => {
          const hasNextFret = frets.length > fretIndex + 1;
          const nextFretNoteIndex = hasNextFret ? getNoteIndexInFret(frets[fretIndex + 1]) : null;
          const currentFretNoteIndex = getNoteIndexInFret(fret);

          return (
            <Fret key={fret.id} fretIndex={fretIndex}>
              {fret.chunks.map((chunk, chunkIndex) => {
                return (
                  <FretChunk
                    key={chunk.id}
                    chunkIndex={chunkIndex}
                    fretIndex={fretIndex}
                    text={chunk.text}
                    hasRightBorder={hasNextFret ? shouldAddRightBorderOnFretChunk(chunkIndex, currentFretNoteIndex, nextFretNoteIndex) : false}
                    onOpenContextMenu={onOpenContextMenu}
                    onEditFretChunkText={onEditFretChunkText}
                  />
                );
              })}
            </Fret>
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

export { Frets };
