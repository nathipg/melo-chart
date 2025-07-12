export const breakLyrics = (lyrics) => {
  const normalizedLyrics = lyrics || '';
  return normalizedLyrics.replaceAll(/\s+/g, ' ').trim().split(' ');
};
