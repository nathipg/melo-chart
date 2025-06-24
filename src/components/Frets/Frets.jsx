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
  loadOnDragEnd,
  loadOnEditFretChunkText,
  removeFret,
  removeString,
  removeEmptyFretsAtTheEnd,
  trimStrings,
  addWordsAsNotes,
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

  const onOpenContextMenu = useCallback((data) => {
    contextMenuFnsRef.current?.setContextMenuData(data);
  }, [ contextMenuFnsRef ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDragEnd = useCallback(loadOnDragEnd(setFrets), [ setFrets ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onEditFretChunkText = useCallback(loadOnEditFretChunkText(setFrets), [ setFrets ]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={style.FretsContainer} data-wrap-frets={wrapFrets} data-show-string-number={showStringNumber}>
        {frets.map((fret, fretIndex) => {
          return (
            <Fret
              key={fret.id}
              fret={fret}
            >
              {fret.chunks.map((chunk, chunkIndex) => {
                return (
                  <FretChunk
                    fret={fret}
                    chunk={chunk}
                    frets={frets}
                    key={chunk.id}
                    chunkIndex={chunkIndex}
                    fretIndex={fretIndex}
                    text={chunk.text}
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
