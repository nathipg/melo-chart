import { expect, describe, it, expectTypeOf } from 'vitest';

import { breakLyrics } from './break-lyrics.function';

describe('breakLyrics function', () => {
  
  it('should be defined', () => {
    expect(breakLyrics).toBeDefined();
  });

  it('should handle nullish arguments', () => {
    const value = breakLyrics();

    expectTypeOf(value).toBeArray();
    expect(value).toHaveLength(1);
  });

  it('should break lyrics words by its spaces and return it as an array', () => {
    const value1 = breakLyrics('I have a phrase here');
    const value2 = breakLyrics('I  have  a  phrase  here  with  double  spaces  here');
    const value3 = breakLyrics('I   have   a   phrase   here   with   triple   spaces   here');
    const value4 = breakLyrics('Ihaveaphraseherewithoutspaces');

    expectTypeOf(value1).toBeArray();
    expect(value1).toHaveLength(5);

    expectTypeOf(value2).toBeArray();
    expect(value2).toHaveLength(9);

    expectTypeOf(value3).toBeArray();
    expect(value3).toHaveLength(9);

    expectTypeOf(value4).toBeArray();
    expect(value4).toHaveLength(1);
  });

  it('should ignore spaces at the start and end of the lyric', () => {
    const value = breakLyrics('   I have a phrase here   ');

    expectTypeOf(value).toBeArray();
    expect(value).toHaveLength(5);
  });

});
