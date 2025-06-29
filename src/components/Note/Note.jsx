import { memo, useCallback } from 'react';

import { NoteChunk } from '../NoteChunk';
import { getPitchIndexInNote } from '../Notes/functions';

import { loadOnEditNoteChunkText, shouldAddRightBorderOnNoteChunk } from './functions';

import style from './Note.module.scss';

const Note = (props) => {
  const { note, noteIndex, nextNoteNoteIndex, hasNextNote, setNotes, contextMenuFnsRef } = props;

  const onOpenContextMenu = useCallback((data) => {
    contextMenuFnsRef.current?.setContextMenuData(data);
  }, [ contextMenuFnsRef ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onEditNoteChunkText = useCallback(loadOnEditNoteChunkText(setNotes), [ setNotes ]);

  return (
    <div className={style.Note}>

      {note.chunks.map((chunk, chunkIndex) => {
        const pitchIndex = (chunkIndex % 12) + 1;
        const isDragDisabled = !chunk.text || noteIndex == 0;
        const isEditionDisabled = noteIndex == 0;

        const currentNoteNoteIndex = getPitchIndexInNote(note);

        const hasRightBorder = hasNextNote ? shouldAddRightBorderOnNoteChunk(chunkIndex, currentNoteNoteIndex, nextNoteNoteIndex) : false;
  
        return (
          <NoteChunk
            note={note}
            chunk={chunk}
            key={chunk.id}
            chunkIndex={chunkIndex}
            noteIndex={noteIndex}
            pitchIndex={pitchIndex}
            text={chunk.text}
            isDragDisabled={isDragDisabled}
            isEditionDisabled={isEditionDisabled}
            hasRightBorder={hasRightBorder}
            onOpenContextMenu={onOpenContextMenu}
            onEditNoteChunkText={onEditNoteChunkText}
          />
        );
      })}
    </div>
  );
};

const NoteMemo = memo(Note);

export { NoteMemo as Note };
