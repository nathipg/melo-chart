import { memo } from 'react';

import styles from './UserNameWithTag.module.scss';

const UserNameWithTag = (props) => {
  const { username, tag } = props;

  return (
    <span>
      {username}<span className={styles.Tag}>#{tag}</span>
    </span>
  );
};

const UserNameWithTagMemo = memo(UserNameWithTag);

export { UserNameWithTagMemo as UserNameWithTag };
