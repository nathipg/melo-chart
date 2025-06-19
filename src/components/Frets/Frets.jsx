import { Fret } from '../Fret';
import { FretChunk } from '../FretChunk';

import style from './Frets.module.scss';

const getNoteIndexInFret = (fret) => {
  return fret.chunks.findIndex(chunk => chunk.text);
};

const shouldAddRightBorderOnFretChunk = (chunkIndex, currentFretNoteIndex, nextFretNoteIndex) => {
  if(currentFretNoteIndex == -1 || nextFretNoteIndex == -1) {
    return false;
  }
  
  if(currentFretNoteIndex < nextFretNoteIndex) { // Next fret note is lower
    if(chunkIndex <= currentFretNoteIndex) {
      return false;
    }

    if(chunkIndex > nextFretNoteIndex) {
      return false;
    }

    return true;
  }

  if(chunkIndex == nextFretNoteIndex) { // Next fret note is the same
    return false;
  }

  // Next fret note is higher

  if(chunkIndex <= currentFretNoteIndex && chunkIndex > nextFretNoteIndex) {
    return true;
  }
};

const Frets = (props) => {
  const { setContextMenuPosition, frets } = props;

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
                    setContextMenuPosition={setContextMenuPosition}
                  />
                );
              })}
            </Fret>
          );
        })}
      </div>
    </>
  );
};

export { Frets };
