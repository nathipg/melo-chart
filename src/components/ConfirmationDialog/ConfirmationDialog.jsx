import { memo, useEffect } from 'react';

import style from './ConfirmationDialog.module.scss';

const ConfirmationDialog = (props) => {
  const { bodyContent, footerContent } = props;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={style.ConfirmationDialogUIBlocker}>
      <div className={style.ConfirmationDialog}>
        <div className={style.ConfirmationDialogHeader}>
          <h2>Confirmation</h2>
        </div>

        <div className={style.ConfirmationDialogBody}>
          {bodyContent}
        </div>

        <div className={style.ConfirmationDialogFooter}>
          {footerContent}
        </div>
      </div>
    </div>
  );
};

const ConfirmationDialogMemo = memo(ConfirmationDialog);

export { ConfirmationDialogMemo as ConfirmationDialog };
