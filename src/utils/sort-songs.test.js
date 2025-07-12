import { expect, describe, it, expectTypeOf } from 'vitest';

import { alphabeticallySortSongs } from './sort-songs.function';

const MOCKED_SONG_WITHOUT_TITLE = Object.freeze({});
const MOCKED_SONG_TITLE_A = Object.freeze({ title: 'A' });
const MOCKED_SONG_TITLE_B = Object.freeze({ title: 'B' });

describe('alphabeticallySortSongs function', () => {

  it('should be defined', () => {
    expect(alphabeticallySortSongs).toBeDefined();
  });

  it('should throw an error if illegal arguments is passed', () => {
    const errorMessage = 'alphabeticallySortSongs: songs should be an array';

    expect(() => alphabeticallySortSongs()).toThrow(errorMessage);
    expect(() => alphabeticallySortSongs(1)).toThrow(errorMessage);
    expect(() => alphabeticallySortSongs('')).toThrow(errorMessage);
    expect(() => alphabeticallySortSongs('asd')).toThrow(errorMessage);
    expect(() => alphabeticallySortSongs({})).toThrow(errorMessage);
  });

  it('should alphabetically sort songs by title', () => {
    const songs = alphabeticallySortSongs([
      MOCKED_SONG_TITLE_B,
      MOCKED_SONG_TITLE_A,
    ]);

    expectTypeOf(songs).toBeArray();
    expect(songs).toHaveLength(2);

    expect(songs[0]).toBe(MOCKED_SONG_TITLE_A);
    expect(songs[1]).toBe(MOCKED_SONG_TITLE_B);

    const songs2 = alphabeticallySortSongs([
      MOCKED_SONG_TITLE_A,
      MOCKED_SONG_TITLE_B,
    ]);

    expectTypeOf(songs2).toBeArray();
    expect(songs2).toHaveLength(2);

    expect(songs2[0]).toBe(MOCKED_SONG_TITLE_A);
    expect(songs2[1]).toBe(MOCKED_SONG_TITLE_B);
  });

  it('should consider songs with title as empty string when comparing', () => {
    const songs = alphabeticallySortSongs([
      MOCKED_SONG_TITLE_B,
      MOCKED_SONG_TITLE_A,
      MOCKED_SONG_WITHOUT_TITLE,
    ]);

    expectTypeOf(songs).toBeArray();
    expect(songs).toHaveLength(3);

    expect(songs[0]).toBe(MOCKED_SONG_WITHOUT_TITLE);
    expect(songs[1]).toBe(MOCKED_SONG_TITLE_A);
    expect(songs[2]).toBe(MOCKED_SONG_TITLE_B);
  });

});
