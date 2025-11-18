import { memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContextMenu } from '@/components';
import { convertRemToPixels } from '@/utils';

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
  const [ scales, setScales ] = useState([ 1 ]);

  const contextMenuFnsRef = useRef(null);
  const notesContainerRef = useRef(null);

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

  const calculateScalesQty = useCallback(() => {
    const notesQty = notesContainerRef?.current?.children?.length;

    if(!notesQty) {
      setScales( [ 1 ] );
      return;
    }

    const noteHeight = notesContainerRef?.current?.children[0].offsetHeight + convertRemToPixels(2);
    const notesContainerHeight = notesContainerRef?.current?.offsetHeight;
    const rowsQty = Math.ceil(notesContainerHeight / noteHeight);

    if(rowsQty > 1) {
      const scalesIdNumber = Array(rowsQty).fill().map((e, i) => 1 + i);
      setScales(scalesIdNumber);
      return;
    }

    setScales( [ 1 ] );
  }, []);

  useEffect(() => {
    calculateScalesQty();
  }, [ calculateScalesQty, wrapNotes, notes ]);

  useEffect(() => {
    window.addEventListener('resize', calculateScalesQty);

    return () => {
      window.removeEventListener('resize', calculateScalesQty);
    };
  }, [ calculateScalesQty ]);

  const scale = notes[0];

  return (
    <div className={style.ChartContainer}>
      <div className={style.ScaleContainer}>
        {scales.map((scaleIndex) => {
          return (
            <Note
              key={`${scale.id}-${scaleIndex}`}
              setNotes={setNotes}
              note={scale}
              noteIndex={scaleIndex}
              hasNextNote={true}
              nextNoteNoteIndex={1}
              contextMenuFnsRef={contextMenuFnsRef}
              isTheNoteDefinitionChunk={true}
            />
          );
        })}
      </div>
      <div
        ref={notesContainerRef}
        className={style.NotesContainer}
        data-wrap-notes={wrapNotes}
      >
        {notes.map((note, noteIndex) => {
          if(noteIndex == 0) {
            return null;
          }

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
    </div>
  );
};

const NotesMemo = memo(Notes);

export { NotesMemo as Notes };
