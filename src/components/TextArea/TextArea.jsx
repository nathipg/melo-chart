import { memo } from 'react';

import style from './TextArea.module.scss';

const TextArea = (props) => {
  return (
    <textarea
      {...props}
      className={style.TextArea}
    >
    </textarea>
  );
};

const TextAreaMemo = memo(TextArea);

export { TextAreaMemo as TextArea };
