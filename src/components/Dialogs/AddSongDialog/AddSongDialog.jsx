import { memo, useEffect, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { Button, ButtonConstants, Dialog, FormAddSong, PlusIcon } from '@/components';
import { SongSlice } from '@/store/slices';

const AddSongDialog = (props) => {
  const { addSongDialogFnsRef } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const addSongStatus = useSelector(SongSlice.selectors.selectAddSongStatus);
  const latestAddedSongId = useSelector(SongSlice.selectors.selectLatestAddedSongId);

  const [ show, setShow ] = useState(false);

  useImperativeHandle(addSongDialogFnsRef, () => {
    return {
      show() {
        setShow(true);
      },
    };
  });

  useEffect(() => {
    if(latestAddedSongId != null) {
      dispatch(SongSlice.actions.clearLatestAddedSongId());
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
                  icon={<PlusIcon />}
                >
                  {t('Add')}
                </Button>
              </>
            }
          />
        ) : <></>
      }
    </>
  );
};

const AddSongDialogMemo = memo(AddSongDialog);

export { AddSongDialogMemo as AddSongDialog };
