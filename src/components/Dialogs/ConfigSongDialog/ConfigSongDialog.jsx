import { memo, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ChartControllers, Dialog } from '@/components';

const ConfigSongDialog = (props) => {
  const { song } = props;
  const { configSongDialogFnsRef, notesFnsRef, generateChartDialogFnsRef, deleteSongDialogFnsRef } = props;

  const { t } = useTranslation();

  const [ show, setShow ] = useState(false);

  useImperativeHandle(configSongDialogFnsRef, () => {
    return {
      show() {
        setShow(true);
      },
    };
  });

  return (
    <Dialog
      show={show}
      title={t('Configure Song')}
      bodyContent={
        <>
          <ChartControllers
            song={song}
            notesFnsRef={notesFnsRef}
            generateChartDialogFnsRef={generateChartDialogFnsRef}
            deleteSongDialogFnsRef={deleteSongDialogFnsRef}
          />
        </>
      }
      footerContent={
        <>
          <Button
            onClick={() => setShow(false)}
          >
            {t('Close')}
          </Button>
        </>
      }
    />
  );
};

const ConfigSongDialogMemo = memo(ConfigSongDialog);

export { ConfigSongDialogMemo as ConfigSongDialog };
