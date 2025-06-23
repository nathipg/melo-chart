import { useCallback } from 'react';

import style from './AddSongTextOption.module.scss';

const AddSongTextOption = (props) => {
  const { onAddWordsAsNotes } = props;

  const breakTextInNote = useCallback((event) => {
    if(event.key == 'Enter') {
      onAddWordsAsNotes(event.target.value);

      event.target.value = '';
    }
  }, [ onAddWordsAsNotes ]);

  return (
    <div className={style.AddSongTextOption}>
      <textarea
        onKeyDown={breakTextInNote}
      ></textarea>
    </div>
  );
};

export { AddSongTextOption };
