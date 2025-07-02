export const breakLyrics = (lyrics) => {
  const normalizedLyrics = lyrics || '';
  return normalizedLyrics.replaceAll('\n', ' ').trim().split(' ');
};
