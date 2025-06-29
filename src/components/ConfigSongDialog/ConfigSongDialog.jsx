import { memo, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button';
import { ChartControllers } from '../ChartControllers';
import { Dialog } from '../Dialog';

const ConfigSongDialog = (props) => {
  const { configSongDialogFnsRef, notesFnsRef, generateChartDialogFnsRef } = props;

  const { t } = useTranslation();

  const [ show, setShow ] = useState(false);

  useImperativeHandle(configSongDialogFnsRef, () => {
    return {
      show() {
        setShow(true);
      },
    };
  });

  if(!show) {
    return <></>;
  }

  return (
    <Dialog
      title={t('Configure Song')}
      bodyContent={
        <>
          <ChartControllers
            generateChartDialogFnsRef={generateChartDialogFnsRef}
            notesFnsRef={notesFnsRef}
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
