import { memo, useCallback } from 'react';

import { Button, ButtonConstants } from '../../Button';
import { InlineInput } from '../../InlineInput/InlineInput';

import style from './NewStringsOption.module.scss';

const NewStringsOption = (props) => {
  const { onAddMultipleStrings } = props;

  const onSubmitAddMultipleStrings = useCallback((event) => {
    event.preventDefault();

    onAddMultipleStrings(+event.target.qty.value);
  }, [ onAddMultipleStrings ]);

  return (
    <form className={style.NewStringsOption} onSubmit={onSubmitAddMultipleStrings}>
      <InlineInput
        label="New Strings"
        type="number"
        name="qty"
      />

      <Button category={ButtonConstants.ButtonCategories.PRIMARY}>Add</Button>
    </form>
  );
};

const NewStringsOptionMemo = memo(NewStringsOption);

export { NewStringsOptionMemo as NewStringsOption };
