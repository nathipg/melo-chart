import { memo } from 'react';
import { createPortal } from 'react-dom';

import style from './Dialog.module.scss';

const Dialog = (props) => {
  const { bodyContent, footerContent, title } = props;

  return createPortal(
    <div className={style.DialogUIBlocker}>
      <div className={style.Dialog}>
        <div className={style.DialogHeader}>
          <h2>{title}</h2>
        </div>

        <div className={style.DialogBody}>
          {bodyContent}
        </div>

        <div className={style.DialogFooter}>
          {footerContent}
        </div>
      </div>
    </div>,
    document.body,
  );
};

const DialogMemo = memo(Dialog);

export { DialogMemo as Dialog };
