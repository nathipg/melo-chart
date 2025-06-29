import { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import style from './ConfirmationDialog.module.scss';

const ConfirmationDialog = (props) => {
  const { bodyContent, footerContent } = props;

  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return createPortal(
    <div className={style.ConfirmationDialogUIBlocker}>
      <div className={style.ConfirmationDialog}>
        <div className={style.ConfirmationDialogHeader}>
          <h2>{t('Confirmation')}</h2>
        </div>

        <div className={style.ConfirmationDialogBody}>
          {bodyContent}
        </div>

        <div className={style.ConfirmationDialogFooter}>
          {footerContent}
        </div>
      </div>
    </div>,
    document.body,
  );
};

const ConfirmationDialogMemo = memo(ConfirmationDialog);

export { ConfirmationDialogMemo as ConfirmationDialog };
