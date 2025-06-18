import { useState } from 'react';

import { nanoid } from 'nanoid';

import { Button } from '../Button';
import { Fret } from '../Fret';
import { FretChunk } from '../FretChunk';

import style from './Frets.module.scss';

const mockedFrets = [
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'Quem' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'não' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'tem' },
      { id: nanoid(), text: '' },
    ],
  },
];

const mockedStringProps = [
  { color: '#00FF00' }, // Green
  { color: '#FF0000' }, // Red
  { color: '#FFFF00' }, // Yellow
  { color: '#1E90FF' }, // Blue
  { color: '#FF8C00' }, // Orange
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

const Frets = () => {
  const [frets, setFrets] = useState(mockedFrets);

  const addFretAtEnd = () => {
    setFrets((currentFrets) => {
      return [
        ...currentFrets,
        generateNewFret(getStringQty(currentFrets)),
      ];
    });
  };

  const addFretAtStart = () => {
    setFrets((currentFrets) => {
      return [
        generateNewFret(getStringQty(currentFrets)),
        ...currentFrets,
      ];
    });
  };

  const addStringAtFretTop = () => {
    setFrets((currentFrets) => {
      return currentFrets.map(fret => {
        return {
          ...fret,
          chunks: [
            generateNewFretChunk(),
            ...fret.chunks,
          ],
        };
      });
    });
  };

  const addStringAtFretBottom = () => {
    setFrets((currentFrets) => {
      return currentFrets.map(fret => {
        return {
          ...fret,
          chunks: [
            ...fret.chunks,
            generateNewFretChunk(),
          ],
        };
      });
    });
  };

  return (
    <>

      <div className={style.FretsContainerVertical}>
        <Button onClick={addStringAtFretTop}>+</Button>

        <div className={style.FretsContainerHorizontal}>
          <Button onClick={addFretAtStart}>+</Button>

          {frets.map(fret => (
            <Fret 
              key={fret.id}>
              {fret.chunks.map((chunk, chunkIndex) => (
                <FretChunk 
                  key={chunk.id} 
                  text={chunk.text} 
                  color={mockedStringProps[chunkIndex]?.color}
                />
              ))}
            </Fret>
          ))}

          <Button onClick={addFretAtEnd}>+</Button>
        </div>

        <Button onClick={addStringAtFretBottom}>+</Button>
      </div>

    </>
  );
};

export { Frets };
