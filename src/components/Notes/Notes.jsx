import { useAbly, useChannel } from 'ably/react';
import { memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContextMenu } from '@/components';
import { SOCKET_CHANNEL, SOCKET_EVENT_NAME_MAPPER } from '@/constants';
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

const SOCKET_EVENT_FN_MAPPER = Object.freeze({
  [SOCKET_EVENT_NAME_MAPPER.ADD_PITCH_ABOVE]: addPitchAtNoteTop,
  [SOCKET_EVENT_NAME_MAPPER.ADD_PITCH_BELOW]: addPitchAtNoteBottom,
  [SOCKET_EVENT_NAME_MAPPER.ADD_NOTE_BEFORE]: addNoteBefore,
  [SOCKET_EVENT_NAME_MAPPER.ADD_NOTE_AFTER]: addNoteAfter,
  [SOCKET_EVENT_NAME_MAPPER.REMOVE_PITCH]: removePitch,
  [SOCKET_EVENT_NAME_MAPPER.REMOVE_NOTE]: removeNote,
});

const Notes = (props) => {
  const { notes: initialNotes, notesFnsRef, songId, setChangesLog } = props;

  const { t } = useTranslation();

  const ably = useAbly();

  const [ notes, setNotes ] = useState(initialNotes);
  const [ wrapNotes, setWrapNotes ] = useState(true);
  const [ scales, setScales ] = useState([ 1 ]);

  const contextMenuFnsRef = useRef(null);
  const notesContainerRef = useRef(null);

  const { publish } = useChannel(SOCKET_CHANNEL, (message) => {
    if(ably.connection.id != message.connectionId) {
      const { name, data } = message;

      if(data.id != songId) {
        return;
      }

      if(name == SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_CHANGES_LOG) {
        data.changesLog?.forEach(changeLog => {
          const { action, data } = changeLog;

          const fn = SOCKET_EVENT_FN_MAPPER[action] || (() => null);
          fn({
            contextMenuData: data.contextMenuData,
            setNotes,
          });
        });

        return;
      }

      const fn = SOCKET_EVENT_FN_MAPPER[name] || (() => null);
      fn({
        contextMenuData: data.contextMenuData,
        setNotes,
      });
    }
  });

  const publishContextMenuEvent = useCallback((eventName, contextMenuData) => {
    const publishData = {
      id: songId,
      contextMenuData,
    };

    setChangesLog((currentChangesLog) => {
      return [
        ...currentChangesLog,
        {
          action: eventName,
          data: publishData,
        },
      ];
    });

    publish(eventName, publishData);
  }, [ publish, setChangesLog, songId ]);

  const contextMenuItems = useMemo(() => {
    return [
      {
        label: t('Add Pitch Above'),
        onClick: (contextMenuData) => {
          addPitchAtNoteTop({ contextMenuData, setNotes });
          publishContextMenuEvent(SOCKET_EVENT_NAME_MAPPER.ADD_PITCH_ABOVE, contextMenuData);
        },
      },
      {
        label: t('Add Pitch Below'),
        onClick: (contextMenuData) => {
          addPitchAtNoteBottom({ contextMenuData, setNotes });
          publishContextMenuEvent(SOCKET_EVENT_NAME_MAPPER.ADD_PITCH_BELOW, contextMenuData);
        },
      },
      {
        label: t('Add Note Before'),
        onClick: (contextMenuData) => {
          addNoteBefore({ contextMenuData, setNotes });
          publishContextMenuEvent(SOCKET_EVENT_NAME_MAPPER.ADD_NOTE_BEFORE, contextMenuData);
        },
      },
      {
        label: t('Add Note After'),
        onClick: (contextMenuData) => {
          addNoteAfter({ contextMenuData, setNotes });
          publishContextMenuEvent(SOCKET_EVENT_NAME_MAPPER.ADD_NOTE_AFTER, contextMenuData);
        },
      },
      {
        label: t('Remove Pitch'),
        type: 'danger',
        onClick: (contextMenuData) => {
          removePitch({ contextMenuData, setNotes });
          publishContextMenuEvent(SOCKET_EVENT_NAME_MAPPER.REMOVE_PITCH, contextMenuData);
        },
      },
      {
        label: t('Remove Note'),
        type: 'danger',
        onClick: (contextMenuData) => {
          removeNote({ contextMenuData, setNotes });
          publishContextMenuEvent(SOCKET_EVENT_NAME_MAPPER.REMOVE_NOTE, contextMenuData);
        },
      },
    ];
  }, [ publishContextMenuEvent, t ]);

  useImperativeHandle(notesFnsRef, () => {
    return {
      setWrapNotes(value) {
        setWrapNotes(value);
      },
      getNotes() {
        return [ ...notes ];
      },
      setNotes(notes) {
        setNotes(notes);
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
        {scales.map((_, scaleIndex) => {
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
              songId={songId}
              setChangesLog={setChangesLog}
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
              songId={songId}
              setChangesLog={setChangesLog}
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
