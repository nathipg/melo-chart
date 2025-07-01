import { memo, useCallback, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { songsSliceActions, songsSliceSelectors, usersSliceSelectors } from '../../../store/slices';
import { Button, ButtonConstants } from '../../Button';
import { ConfirmationDialog } from '../../ConfirmationDialog';
import { GrowlFns } from '../../Growl';

const DeleteSongConfirmDialog = (props) => {
  const { deleteSongDialogFnsRef, song } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const loggedUser = useSelector(usersSliceSelectors.selectLoggedUser);
  const deleteSongError = useSelector(songsSliceSelectors.selectDeleteSongError);

  const [ show, setShow ] = useState(false);

  useImperativeHandle(deleteSongDialogFnsRef, () => {
    return {
      show() {
        setShow(true);
      },
    };
  });

  const onConfirm = useCallback(() => {
    dispatch(songsSliceActions.deleteSong({
      loggedUser,
      id: song.id,
    }));
  }, [ dispatch, loggedUser, song.id ]);

  const onCloseDeleteSongErrorGrowl = useCallback(() => {
    dispatch(songsSliceActions.clearDeleteSongError());
  }, [ dispatch ]);

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
      
      {GrowlFns.renderErrorGrowl({
        message: deleteSongError,
        onCloseGrowl: onCloseDeleteSongErrorGrowl,
      })}
    </>
  );
};

const DeleteSongConfirmDialogMemo = memo(DeleteSongConfirmDialog);

export { DeleteSongConfirmDialogMemo as DeleteSongConfirmDialog };
