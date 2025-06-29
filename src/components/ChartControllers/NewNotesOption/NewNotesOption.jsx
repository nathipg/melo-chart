import { memo, useCallback } from 'react';

import { Button, ButtonConstants } from '../../Button';
import { InlineInput } from '../../InlineInput/InlineInput';

import style from './NewNotesOption.module.scss';

const NewNotesOption = (props) => {
  const { onAddMultipleNotes } = props;

  const onSubmitAddMultipleNotes = useCallback((event) => {
    event.preventDefault();

    onAddMultipleNotes(+event.target.qty.value);
  }, [ onAddMultipleNotes ]);

  return (
    <form className={style.NewNotesOption} onSubmit={onSubmitAddMultipleNotes}>
      <InlineInput
        label="New Notes"
        type="number"
        name="qty"
      />

      <Button category={ButtonConstants.ButtonCategories.PRIMARY}>Add</Button>
    </form>
  );
};

const NewNotesOptionMemo = memo(NewNotesOption);

export { NewNotesOptionMemo as NewNotesOption };
