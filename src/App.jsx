import { useState } from 'react';

import { nanoid } from 'nanoid';

import { ContextMenu, Frets } from './components';

import './global.scss';

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

const generateNewFretChunk = () => {
  return { 
    id: nanoid(), 
    text: '',
  };
};

const generateNewFret = (stringsQty) => {
  const chunks = Array.from(
    { length: stringsQty }, 
    () => generateNewFretChunk(),
  );

  return { 
    id: nanoid(), 
    chunks, 
  };
};

const getStringQty = (frets) => {
  return frets[0].chunks.length;
};

const App = () => {
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [frets, setFrets] = useState(mockedFrets);

  const addFret = (fretIndex) => {
    setFrets((currentFrets) => {
      return [
        ...currentFrets.slice(0, fretIndex),
        generateNewFret(getStringQty(currentFrets)),
        ...currentFrets.slice(fretIndex),
      ];
    });
  };

  const addString = (chunkIndex) => {
    setFrets((currentFrets) => {
      return currentFrets.map(fret => {
        const updatedChunks = [
          ...fret.chunks.slice(0, chunkIndex),
          generateNewFretChunk(),
          ...fret.chunks.slice(chunkIndex),
        ];

        return {
          ...fret,
          chunks: updatedChunks,
        };
      });
    });
  };

  const addFretBefore = () => {
    const { fretIndex } = contextMenuPosition;

    addFret(fretIndex);
  };

  const addFretAfter = () => {
    const { fretIndex } = contextMenuPosition;

    addFret(fretIndex + 1);
  };

  const addStringAtFretTop = () => {
    const { chunkIndex } = contextMenuPosition;

    addString(chunkIndex);
  };

  const addStringAtFretBottom = () => {
    const { chunkIndex } = contextMenuPosition;
    
    addString(chunkIndex + 1);
  };

  const removeFret = () => {
    const { fretIndex } = contextMenuPosition;

    setFrets((currentFrets) => {
      return [
        ...currentFrets.slice(0, fretIndex),
        ...currentFrets.slice(fretIndex + 1),
      ];
    });
  };

  const removeString = () => {
    const { chunkIndex } = contextMenuPosition;

    setFrets((currentFrets) => {
      return currentFrets.map(fret => {
        const updatedChunks = [
          ...fret.chunks.slice(0, chunkIndex),
          ...fret.chunks.slice(chunkIndex + 1),
        ];

        return {
          ...fret,
          chunks: updatedChunks,
        };
      });
    });
  };

  const contextMenuItems = [
    {
      label: 'Add String Above', 
      onClick: () => {
        addStringAtFretTop(); 
      },
    },
    {
      label: 'Add String Below', 
      onClick: () => {
        addStringAtFretBottom();
      },
    },
    {
      label: 'Add Fret Before', 
      onClick: () => {
        addFretBefore();
      },
    },
    {
      label: 'Add Fret After', 
      onClick: () => {
        addFretAfter();
      },
    },
    {
      label: 'Remove Fret',
      type: 'danger',
      onClick: () => {
        removeFret();
      },
    },
    {
      label: 'Remove String',
      type: 'danger',
      onClick: () => {
        removeString();
      },
    },
  ];

  return (
    <>
      <h1>Melo Chart</h1>

      <Frets 
        frets={frets}
        setContextMenuPosition={setContextMenuPosition} 
      />

      {
        contextMenuPosition ? (
          <ContextMenu 
            items={contextMenuItems} 
            top={contextMenuPosition.top}
            left={contextMenuPosition.left}
            setContextMenuPosition={setContextMenuPosition}
          />
        ) : <></>
      }
    </>
  );
};

export default App;
