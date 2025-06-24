import { Droppable } from '@hello-pangea/dnd';
import { memo, useCallback } from 'react';

import { DRAG_TYPES } from '../../constants';
import { FretChunk } from '../FretChunk';
import { getNoteIndexInFret, loadOnEditFretChunkText, shouldAddRightBorderOnFretChunk } from '../Frets/functions';

import style from './Fret.module.scss';

const Fret = (props) => {
  const { fret, fretIndex, nextFretNoteIndex, hasNextFret, setFrets, contextMenuFnsRef } = props;

  const onOpenContextMenu = useCallback((data) => {
    contextMenuFnsRef.current?.setContextMenuData(data);
  }, [ contextMenuFnsRef ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onEditFretChunkText = useCallback(loadOnEditFretChunkText(setFrets), [ setFrets ]);

  return (
    <Droppable droppableId={`fret-${fret.id}`} type={DRAG_TYPES.CHUNKS_IN_FRET}>
      {(provided) => (
        <div
          className={style.Fret}
          ref={provided.innerRef}
          {...provided.droppableProps}>

          {fret.chunks.map((chunk, chunkIndex) => {
            const noteIndex = (chunkIndex % 12) + 1;
            const isDragDisabled = !chunk.text || fretIndex == 0;
            const isEditionDisabled = fretIndex == 0;

            const currentFretNoteIndex = getNoteIndexInFret(fret);

            const hasRightBorder = hasNextFret ? shouldAddRightBorderOnFretChunk(chunkIndex, currentFretNoteIndex, nextFretNoteIndex) : false;
  
            return (
              <FretChunk
                fret={fret}
                chunk={chunk}
                key={chunk.id}
                chunkIndex={chunkIndex}
                fretIndex={fretIndex}
                noteIndex={noteIndex}
                text={chunk.text}
                isDragDisabled={isDragDisabled}
                isEditionDisabled={isEditionDisabled}
                hasRightBorder={hasRightBorder}
                onOpenContextMenu={onOpenContextMenu}
                onEditFretChunkText={onEditFretChunkText}
              />
            );
          })}

          {provided.placeholder}
          
        </div>
      )}
    </Droppable>
  );
};

const FretMemo = memo(Fret);

export { FretMemo as Fret };
