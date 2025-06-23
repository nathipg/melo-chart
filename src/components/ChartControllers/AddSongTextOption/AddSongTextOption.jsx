import { memo, useCallback, useState } from 'react';

import { Button, ButtonConstants } from '../../Button';

import style from './AddSongTextOption.module.scss';

const AddSongTextOption = (props) => {
  const { onAddWordsAsNotes } = props;

  const [ editMode, setEditMode ] = useState(false);

  const breakTextInNote = useCallback((event) => {
    if(event.key == 'Enter') {
      onAddWordsAsNotes(event.target.value);

      event.target.value = '';

      setEditMode(false);
    }
  }, [ onAddWordsAsNotes ]);

  return (
    <div className={style.AddSongTextOption}>
      {
        editMode ? (
          <textarea
            onKeyDown={breakTextInNote}
          ></textarea>
        ) : (
          <></>
        )
      }

      <Button
        category={ButtonConstants.ButtonCategories.DANGER}
        onClick={() => setEditMode(editMode => !editMode)}
      >
        {
          editMode ?
            'Cancel replace song with lyrics'
            : 'Replace song with lyrics'
        }
      </Button>
    </div>
  );
};

const AddSongTextOptionMemo = memo(AddSongTextOption);

export { AddSongTextOptionMemo as AddSongTextOption };
