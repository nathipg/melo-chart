import { nanoid } from 'nanoid';
import { useCallback, useMemo, useRef, useState } from 'react';

import { ContextMenu } from '../ContextMenu';
import { Fret } from '../Fret';
import { FretChunk } from '../FretChunk';

import { addFretAfter, addFretBefore, addStringAtFretBottom, addStringAtFretTop, getNoteIndexInFret, removeFret, removeString, shouldAddRightBorderOnFretChunk } from './functions';

import style from './Frets.module.scss';

const mockedFrets = [
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'Quem' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'não' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'tem' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'te' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'to' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'de' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'vi-dro' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'que' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'a' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'ti' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'rea' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'pri' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'mei' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'ra' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
];

const Frets = () => {
  const [frets, setFrets] = useState(mockedFrets);

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

  const onOpenContextMenu = useCallback((data) => {
    contextMenuFnsRef.current?.setContextMenuData(data);
  }, [contextMenuFnsRef]);

  return (
    <>
      <div className={style.FretsContainer}>
        {frets.map((fret, fretIndex) => {
          const hasNextFret = frets.length > fretIndex + 1;
          const nextFretNoteIndex = hasNextFret ? getNoteIndexInFret(frets[fretIndex + 1]) : null;
          const currentFretNoteIndex = getNoteIndexInFret(fret);

          return (
            <Fret
              key={fret.id}>
              {fret.chunks.map((chunk, chunkIndex) => {
                return (
                  <FretChunk
                    key={chunk.id}
                    chunkIndex={chunkIndex}
                    fretIndex={fretIndex}
                    text={chunk.text}
                    hasRightBorder={hasNextFret ? shouldAddRightBorderOnFretChunk(chunkIndex, currentFretNoteIndex, nextFretNoteIndex) : false}
                    onOpenContextMenu={onOpenContextMenu}
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
    </>
  );
};

export { Frets };
