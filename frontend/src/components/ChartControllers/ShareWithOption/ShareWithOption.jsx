import { useAbly, useChannel } from 'ably/react';
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

  const ably = useAbly();
  
  const { publish } = useChannel('melo-chart-song-updates', (message) => {
    if(ably.connection.id != message.connectionId) {
      const { name, data } = message;
      
      if(data.id != songId) {
        return;
      }
  
      if(name == 'update-chart-shared-with') {
        dispatch(SongSlice.actions.editSongEditors({
          id: data.id,
          editors: data.editors,
          editorsData: data.editorsData,
        }));
      }
    }
  });

  const onChangeSelectedUsers = useCallback(async (options) => {
    const selectedEditors = options.map(option => option.value);
    const updatedEditors = [ ...new Set([ song.owner, ...selectedEditors ]) ];

    const updatedData = {
      editors: updatedEditors,
      editorsData: options,
    };

    dispatch(SongSlice.actions.saveSong({
      ...song,
      ...updatedData,
    }));
    
    publish('update-chart-shared-with', {
      id: songId,
      ...updatedData,
    });
  }, [ dispatch, publish, song, songId ]);

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
