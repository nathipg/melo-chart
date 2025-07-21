import { Link } from '@/components';
import i18n from '@/i18n';

const { t } = i18n;

export const renderSongs = (songs) => {
  if(!songs.length) {
    return (
      <li>{t('No songs here. What about adding one?')}</li>
    );
  }

  return songs.map(song => {
    return (
      <li key={song.id}>
        <Link to={{ pathname: '/chart', search: `?id=${song.id}` }}>{song.title}</Link>
      </li>
    );
  });
};
