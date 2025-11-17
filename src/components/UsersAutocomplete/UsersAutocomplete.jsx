import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';

import { UserSlice } from '@/store/slices';

import styles from './UsersAutocomplete.module.scss';

const UsersAutocomplete = (props) => {
  const { onChangeSelectedUsers, selectedOptions } = props;

  const publicUsers = useSelector(UserSlice.selectors.selectPublicUsers);

  const loadOptions = useCallback(async (inputValue, callback) => {
    const result = publicUsers.filter(user => {
      const userNameWithTag = `${user.username}#${user.tag}`;
      return userNameWithTag.toLowerCase().includes(inputValue.toLowerCase());
    }).map(user => {
      return {
        value: user.uid,
        label: `${user.username}#${user.tag}`,
      };
    });

    callback(result);
  }, [ publicUsers ]);

  return (
    <div className={styles.UsersAutocomplete}>
      <AsyncSelect
        loadOptions={loadOptions}
        isMulti
        cacheOptions
        defaultOptions
        onChange={onChangeSelectedUsers}
        defaultValue={selectedOptions}
      />
    </div>
  );
};

const UsersAutocompleteMemo = memo(UsersAutocomplete);

export { UsersAutocompleteMemo as UsersAutocomplete };
