import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Button, ButtonConstants } from '@/components';
import { UserSlice } from '@/store/slices';

const DeleteSongOption = (props) => {
  const { song } = props;
  const { deleteSongDialogFnsRef } = props;
  
  const { t } = useTranslation();

  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);

  if(song.owner != loggedUser?.uid) {
    return <></>;
  }

  return (
    <>
      <Button
        category={ButtonConstants.ButtonCategories.DANGER}
        onClick={() => deleteSongDialogFnsRef.current?.show()}
      >
        {t('Delete Song')}
      </Button>
    </>
  );
};

const DeleteSongOptionMemo = memo(DeleteSongOption);

export { DeleteSongOptionMemo as DeleteSongOption };
