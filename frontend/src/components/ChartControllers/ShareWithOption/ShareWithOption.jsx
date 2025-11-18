import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { FieldWithLabel, UsersAutocomplete } from '@/components';
import { SongSlice } from '@/store/slices';

import styles from './ShareWithOption.module.scss';

const ShareWithOption = (props) => {
  const { songId } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const song = useSelector(SongSlice.selectors.selectSongById(songId));

  const onChangeSelectedUsers = useCallback(async (options) => {
    const selectedEditors = options.map(option => option.value);
    const updatedEditors = [ ...new Set([ song.owner, ...selectedEditors ]) ];

    dispatch(SongSlice.actions.saveSong({
      ...song,
      editors: updatedEditors,
      editorsData: options,
    }));
  }, [ dispatch, song ]);

  return (
    <div className={styles.ShareWithOption}>
      <FieldWithLabel
        label={t('Shared With')}
        field={(
          <UsersAutocomplete
            selectedOptions={song.editorsData}
            onChangeSelectedUsers={onChangeSelectedUsers}
          />
        )}
      />
    </div>
  );
};

const ShareWithOptionMemo = memo(ShareWithOption);

export { ShareWithOptionMemo as ShareWithOption };
