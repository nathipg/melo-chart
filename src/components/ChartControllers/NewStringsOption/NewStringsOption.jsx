import { useCallback } from 'react';

import { Button } from '../../Button';
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

      <Button>Add</Button>
    </form>
  );
};

export { NewStringsOption };
