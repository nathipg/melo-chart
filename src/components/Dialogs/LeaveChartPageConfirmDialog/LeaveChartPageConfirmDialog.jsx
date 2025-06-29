import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '../../Button';
import { ConfirmationDialog } from '../../ConfirmationDialog';

const LeaveChartPageConfirmDialog = (props) => {
  const { show, onConfirm, onCancel } = props;

  const { t } = useTranslation();

  if(!show) {
    return <></>;
  }

  return (
    <ConfirmationDialog
      bodyContent={(
        <>
          <p>{t('Are you sure you want to leave this page?')}</p>
          <p>{t('Some unsaved changes will be lost')}</p>
        </>
      )}
      footerContent={(
        <>
          <Button
            category={ButtonConstants.ButtonCategories.DANGER}
            onClick={onConfirm}
          >
            {t('Leave Page')}
          </Button>
          <Button
            category={ButtonConstants.ButtonCategories.DEFAULT}
            onClick={onCancel}
          >
            {t('Cancel')}
          </Button>
        </>
      )}
    />
  );
};

const LeaveChartPageConfirmDialogMemo = memo(LeaveChartPageConfirmDialog);

export { LeaveChartPageConfirmDialogMemo as LeaveChartPageConfirmDialog };
