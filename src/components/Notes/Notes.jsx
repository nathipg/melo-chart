import { memo, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContextMenu } from '@/components';

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
import { Note } from './Note';

import style from './Notes.module.scss';

const Notes = (props) => {
  const { notes: initialNotes, notesFnsRef } = props;

  const { t } = useTranslation();

  const [ notes, setNotes ] = useState(initialNotes);
  const [ wrapNotes, setWrapNotes ] = useState(true);

  const contextMenuFnsRef = useRef(null);

  const contextMenuItems = useMemo(() => {
    return [
      {
        label: t('Add Pitch Above'),
        onClick: (contextMenuData) => {
          addPitchAtNoteTop({ contextMenuData, setNotes });
        },
      },
      {
        label: t('Add Pitch Below'),
        onClick: (contextMenuData) => {
          addPitchAtNoteBottom({ contextMenuData, setNotes });
        },
      },
      {
        label: t('Add Note Before'),
        onClick: (contextMenuData) => {
          addNoteBefore({ contextMenuData, setNotes });
        },
      },
      {
        label: t('Add Note After'),
        onClick: (contextMenuData) => {
          addNoteAfter({ contextMenuData, setNotes });
        },
      },
      {
        label: t('Remove Pitch'),
        type: 'danger',
        onClick: (contextMenuData) => {
          removePitch({ contextMenuData, setNotes });
        },
      },
      {
        label: t('Remove Note'),
        type: 'danger',
        onClick: (contextMenuData) => {
          removeNote({ contextMenuData, setNotes });
        },
      },
    ];
  }, [ t ]);

  useImperativeHandle(notesFnsRef, () => {
    return {
      setWrapNotes(value) {
        setWrapNotes(value);
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
    <div
      className={style.NotesContainer}
      data-wrap-notes={wrapNotes}
    >
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
