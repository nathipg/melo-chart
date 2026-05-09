import { Link } from '@/components';
import i18n from '@/i18n';

import { TEST_IDS } from '../constants';

const { t } = i18n;

export const renderSongs = (songs = []) => {
  if(!songs.length) {
    return (
      <li data-testid={TEST_IDS.EMPTY_LIST_MESSAGE}>
        {t('No songs here')}
      </li>
    );
  }

  return songs.map(song => {
    if(!song.id || !song.title) {
      // eslint-disable-next-line no-unused-vars
      const { notes, ...songWithoutNotes } = song;
      console.warn(`renderSongs: Song not rendered because id and/or title was not defined. ${JSON.stringify(songWithoutNotes)}`);

      return <></>;
    }

    return (
      <li key={song.id} data-testid={TEST_IDS.SONG}>
        <Link to={{ pathname: '/chart', search: `?id=${song.id}` }}>{song.title}</Link>
      </li>
    );
  });
};
