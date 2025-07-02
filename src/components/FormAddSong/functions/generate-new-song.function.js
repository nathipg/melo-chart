import { v7 as uuid } from 'uuid';

import { breakLyrics } from '../../../utils';
import { generateNewNote } from '../../Notes/functions/generate-new-note.function';

export const generateNewSong = (data) => {
  const { title, pitches, lyrics } = data;

  const normalizedPitches = isNaN(pitches) ? 1 : pitches;

  const allWords = breakLyrics(lyrics);

  const notes = lyrics ?
    [
      generateNewNote(normalizedPitches),
      ...allWords.map(word => {
        const note = generateNewNote(normalizedPitches);
        note.chunks[0].text = word;

        return note;
      }),
    ]
    : Array.from({ length: 1 }, () => generateNewNote(normalizedPitches));

  return {
    id: uuid(),
    title,
    notes,
  };
};
