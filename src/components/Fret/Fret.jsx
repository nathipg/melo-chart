import { memo, useCallback } from 'react';

import { FretChunk } from '../FretChunk';
import { getPitchIndexInFret, loadOnEditFretChunkText, shouldAddRightBorderOnFretChunk } from '../Frets/functions';

import style from './Fret.module.scss';

const Fret = (props) => {
  const { fret, fretIndex, nextFretNoteIndex, hasNextFret, setFrets, contextMenuFnsRef } = props;

  const onOpenContextMenu = useCallback((data) => {
    contextMenuFnsRef.current?.setContextMenuData(data);
  }, [ contextMenuFnsRef ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onEditFretChunkText = useCallback(loadOnEditFretChunkText(setFrets), [ setFrets ]);

  return (
    <div className={style.Fret}>

      {fret.chunks.map((chunk, chunkIndex) => {
        const pitchIndex = (chunkIndex % 12) + 1;
        const isDragDisabled = !chunk.text || fretIndex == 0;
        const isEditionDisabled = fretIndex == 0;

        const currentFretNoteIndex = getPitchIndexInFret(fret);

        const hasRightBorder = hasNextFret ? shouldAddRightBorderOnFretChunk(chunkIndex, currentFretNoteIndex, nextFretNoteIndex) : false;
  
        return (
          <FretChunk
            fret={fret}
            chunk={chunk}
            key={chunk.id}
            chunkIndex={chunkIndex}
            fretIndex={fretIndex}
            pitchIndex={pitchIndex}
            text={chunk.text}
            isDragDisabled={isDragDisabled}
            isEditionDisabled={isEditionDisabled}
            hasRightBorder={hasRightBorder}
            onOpenContextMenu={onOpenContextMenu}
            onEditFretChunkText={onEditFretChunkText}
          />
        );
      })}
    </div>
  );
};

const FretMemo = memo(Fret);

export { FretMemo as Fret };
