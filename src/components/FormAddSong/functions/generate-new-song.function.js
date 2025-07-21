import { v7 as uuid } from 'uuid';

import { NoteFns } from '@/components';
import { breakLyrics } from '@/utils';

export const generateNewSong = (data) => {
  const { title, pitches, lyrics } = data;

  const normalizedPitches = isNaN(pitches) ? 1 : pitches;

  const allWords = breakLyrics(lyrics);

  const notes = lyrics ?
    [
      NoteFns.generateNewNote(normalizedPitches),
      ...allWords.map(word => {
        const note = NoteFns.generateNewNote(normalizedPitches);
        note.chunks[0].text = word;

        return note;
      }),
    ]
    : Array.from({ length: 1 }, () => NoteFns.generateNewNote(normalizedPitches));

  return {
    id: uuid(),
    title,
    notes,
  };
};
