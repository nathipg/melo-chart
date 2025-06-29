import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '../../Button';

const DeleteSongOption = (props) => {
  const { deleteSongDialogFnsRef } = props;
  
  const { t } = useTranslation();

  return (
    <>
      <Button
        category={ButtonConstants.ButtonCategories.DANGER}
        onClick={() => deleteSongDialogFnsRef.current?.show()}
      >
        {t('Delete song')}
      </Button>
    </>
  );
};

const DeleteSongOptionMemo = memo(DeleteSongOption);

export { DeleteSongOptionMemo as DeleteSongOption };
