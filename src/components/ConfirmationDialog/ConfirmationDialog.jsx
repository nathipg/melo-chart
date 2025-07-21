import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Dialog } from '@/components';

const ConfirmationDialog = (props) => {
  const { bodyContent, footerContent } = props;

  const { t } = useTranslation();

  return (
    <Dialog
      title={t('Confirmation')}
      bodyContent={bodyContent}
      footerContent={footerContent}
    />
  );
};

const ConfirmationDialogMemo = memo(ConfirmationDialog);

export { ConfirmationDialogMemo as ConfirmationDialog };
