import { memo, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { ContextMenu } from '../ContextMenu';
import { Note } from '../Note';

import {
  addNoteAfter,
  addMultiplePitches,
  addNoteBefore,
  addMultipleNotes,
  addPitchAtNoteBottom,
  addPitchAtNoteTop,
  removeNote,
  removePitch,
  removeEmptyNotesAtTheEnd,
  trimPitches,
  addWordsAsNotes,
  getPitchIndexInNote,
} from './functions';

import style from './Notes.module.scss';

const Notes = (props) => {
  const { notes: initialNotes, notesFnsRef } = props;

  const [ notes, setNotes ] = useState(initialNotes);
  const [ wrapNotes, setWrapNotes ] = useState(true);
  const [ showPitchNumber, setShowPitchNumber ] = useState(false);

  const contextMenuFnsRef = useRef(null);

  const contextMenuItems = useMemo(() => {
    return [
      {
        label: 'Add Pitch Above',
        onClick: (contextMenuData) => {
          addPitchAtNoteTop({ contextMenuData, setNotes });
        },
      },
      {
        label: 'Add Pitch Below',
        onClick: (contextMenuData) => {
          addPitchAtNoteBottom({ contextMenuData, setNotes });
        },
      },
      {
        label: 'Add Note Before',
        onClick: (contextMenuData) => {
          addNoteBefore({ contextMenuData, setNotes });
        },
      },
      {
        label: 'Add Note After',
        onClick: (contextMenuData) => {
          addNoteAfter({ contextMenuData, setNotes });
        },
      },
      {
        label: 'Remove Note',
        type: 'danger',
        onClick: (contextMenuData) => {
          removeNote({ contextMenuData, setNotes });
        },
      },
      {
        label: 'Remove Pitch',
        type: 'danger',
        onClick: (contextMenuData) => {
          removePitch({ contextMenuData, setNotes });
        },
      },
    ];
  }, [ setNotes ]);

  useImperativeHandle(notesFnsRef, () => {
    return {
      setWrapNotes(value) {
        setWrapNotes(value);
      },
      setShowPitchNumber(value) {
        setShowPitchNumber(value);
      },
      getNotes() {
        return [ ...notes ];
      },
      addMultipleNotes(qty) {
        addMultipleNotes({ setNotes, qty });
      },
      addMultiplePitches(qty) {
        addMultiplePitches({ setNotes, qty });
      },
      removeEmptyNotesAtTheEnd() {
        removeEmptyNotesAtTheEnd({ setNotes });
      },
      trimPitches() {
        trimPitches({ setNotes });
      },
      addWordsAsNotes(songText) {
        addWordsAsNotes({ setNotes, songText });
      },
    };
  });

  return (
    <div className={style.NotesContainer} data-wrap-notes={wrapNotes} data-show-pitch-number={showPitchNumber}>
      {notes.map((note, noteIndex) => {
        const hasNextNote = notes.length > noteIndex + 1;
        const nextNoteNoteIndex = hasNextNote ? getPitchIndexInNote(notes[noteIndex + 1]) : null;

        return (
          <Note
            key={note.id}
            setNotes={setNotes}
            note={note}
            noteIndex={noteIndex}
            hasNextNote={hasNextNote}
            nextNoteNoteIndex={nextNoteNoteIndex}
            contextMenuFnsRef={contextMenuFnsRef}
          />
        );
      })}

      <ContextMenu
        items={contextMenuItems}
        contextMenuFnsRef={contextMenuFnsRef}
      />
    </div>
  );
};

const NotesMemo = memo(Notes);

export { NotesMemo as Notes };
