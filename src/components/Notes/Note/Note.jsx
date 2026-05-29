import { memo, useCallback } from 'react';

import { getPitchIndexInNote } from '../functions';

import { loadOnEditNoteChunkText, loadOnEditNoteDefinitionChunkText, shouldAddRightBorderOnNoteChunk } from './functions';
import { NoteChunk } from './NoteChunk';

import style from './Note.module.scss';

const Note = (props) => {
  const { note, noteIndex, nextNoteNoteIndex, hasNextNote, isTheNoteDefinitionChunk, setNotes, contextMenuFnsRef, songId } = props;

  const onOpenContextMenu = useCallback((data) => {
    contextMenuFnsRef.current?.setContextMenuData(data);
  }, [ contextMenuFnsRef ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onEditNoteChunkText = useCallback(loadOnEditNoteChunkText(setNotes), [ setNotes ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onEditNoteDefinitionChunkText = useCallback(loadOnEditNoteDefinitionChunkText(setNotes), [ setNotes ]);

  return (
    <div className={style.Note}>

      {note.chunks.map((chunk, chunkIndex) => {
        const currentNoteNoteIndex = getPitchIndexInNote(note);
        const hasRightBorder = hasNextNote ? shouldAddRightBorderOnNoteChunk(chunkIndex, currentNoteNoteIndex, nextNoteNoteIndex) : false;

        return (
          <div style={{position: 'relative'}}>
            <strong style={{
              position: 'absolute',
              display: 'block',
              marginLeft: '50%',
              transform: 'translate(-50%, -1rem)',
            }}>{noteIndex}</strong>
            <NoteChunk
              note={note}
              chunk={chunk}
              key={chunk.id}
              chunkIndex={chunkIndex}
              noteIndex={noteIndex}
              filledNoteIndex={currentNoteNoteIndex}
              text={chunk.text}
              hasRightBorder={hasRightBorder}
              isTheNoteDefinitionChunk={isTheNoteDefinitionChunk}
              onOpenContextMenu={onOpenContextMenu}
              onEditNoteChunkText={onEditNoteChunkText}
              onEditNoteDefinitionChunkText={onEditNoteDefinitionChunkText}
              songId={songId}
            />
          </div>
        );
      })}
    </div>
  );
};

const NoteMemo = memo(Note);

export { NoteMemo as Note };
