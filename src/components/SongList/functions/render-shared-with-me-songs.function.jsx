import { Fragment } from 'react';

import { UserNameWithTag } from '@/components/UserNameWithTag';
import i18n from '@/i18n';

import { TEST_IDS } from '../constants';

import { renderSongs } from '.';

const { t } = i18n;

export const renderSharedWithMeSongs = (songs = []) => {
  const groupedSongs = songs.reduce((acc, song) => {
    return {
      ...acc,
      [song.owner]: [
        ...(acc[song.owner] || []),
        song,
      ],
    };
  }, {});

  if(!songs.length) {
    return (
      <li data-testid={TEST_IDS.EMPTY_LIST_MESSAGE}>
        {t('No songs here')}
      </li>
    );
  }

  return Object.keys(groupedSongs).map(user => {
    const userSongs = groupedSongs[user];

    if(!userSongs?.length) {
      return <></>;
    }

    const { ownerData = { username: t('Unknown User'), tag: '0' } } = userSongs[0] || {};

    return (
      <Fragment key={ownerData.uid}>
        <h3>
          <UserNameWithTag
            {...ownerData}
          />
        </h3>
        {renderSongs(userSongs)}
        <br />
      </Fragment>
    );
  });
};
