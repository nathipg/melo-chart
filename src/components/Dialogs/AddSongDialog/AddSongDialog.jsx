import { memo, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { songsSliceActions, songsSliceSelectors } from '../../../store/slices';
import { Button, ButtonConstants } from '../../Button';
import { Dialog } from '../../Dialog';
import { FormAddSong } from '../../FormAddSong';
import { GrowlFns } from '../../Growl';
import { PlusIcon } from '../../Icons';

const AddSongDialog = (props) => {
  const { addSongDialogFnsRef } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const addSongStatus = useSelector(songsSliceSelectors.selectAddSongStatus);
  const addSongError = useSelector(songsSliceSelectors.selectAddSongError);
  const latestAddedSongId = useSelector(songsSliceSelectors.selectLatestAddedSongId);

  const [ show, setShow ] = useState(false);

  useImperativeHandle(addSongDialogFnsRef, () => {
    return {
      show() {
        setShow(true);
      },
    };
  });

  const onCloseAddSongErrorGrowl = useCallback(() => {
    dispatch(songsSliceActions.clearAddSongError());
  }, [ dispatch ]);

  useEffect(() => {
    if(latestAddedSongId != null) {
      dispatch(songsSliceActions.clearLatestAddedSongId());
      navigate(`/chart?id=${latestAddedSongId}`);
    }
  }, [ addSongStatus, dispatch, latestAddedSongId, navigate ]);

  return (
    <>
      <Button
        category={ButtonConstants.ButtonCategories.SUCCESS}
        onClick={() => setShow(true)}
        icon={<PlusIcon />}
      >
        {t('Add Song')}
      </Button>
      {
        show ? (
          <Dialog
            title={t('Add Song')}
            bodyContent={
              <FormAddSong />
            }
            footerContent={
              <>
                <Button
                  onClick={() => setShow(false)}
                >
                  {t('Close')}
                </Button>

                <Button
                  category={ButtonConstants.ButtonCategories.SUCCESS}
                  form="formAddSong"
                  type="submit"
                >
                  {t('Add')}
                </Button>
              </>
            }
          />
        ) : <></>
      }

      {GrowlFns.renderErrorGrowl({
        message: addSongError,
        onCloseGrowl: onCloseAddSongErrorGrowl,
      })}
    </>
  );
};

const AddSongDialogMemo = memo(AddSongDialog);

export { AddSongDialogMemo as AddSongDialog };
