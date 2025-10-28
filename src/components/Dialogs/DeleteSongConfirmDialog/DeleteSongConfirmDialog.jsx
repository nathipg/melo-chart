import { memo, useCallback, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Button, ButtonConstants, ConfirmationDialog } from '@/components';
import { SongSlice } from '@/store/slices';

const DeleteSongConfirmDialog = (props) => {
  const { deleteSongDialogFnsRef, song } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [ show, setShow ] = useState(false);

  useImperativeHandle(deleteSongDialogFnsRef, () => {
    return {
      show() {
        setShow(true);
      },
    };
  });

  const onConfirm = useCallback(() => {
    dispatch(SongSlice.actions.deleteSong(song.id));
  }, [ dispatch, song.id ]);

  if(!show) {
    return <></>;
  }

  return (
    <>
      <ConfirmationDialog
        bodyContent={(
          <>
            <p>{t('Are you sure you want to delete this song?')}</p>
            <p>{t('This action cannot be undone')}</p>
          </>
        )}
        footerContent={(
          <>
            <Button
              category={ButtonConstants.ButtonCategories.DANGER}
              onClick={onConfirm}
            >
              {t('Delete Song')}
            </Button>
            <Button
              category={ButtonConstants.ButtonCategories.DEFAULT}
              onClick={() => setShow(false)}
            >
              {t('Cancel')}
            </Button>
          </>
        )}
      />
    </>
  );
};

const DeleteSongConfirmDialogMemo = memo(DeleteSongConfirmDialog);

export { DeleteSongConfirmDialogMemo as DeleteSongConfirmDialog };
