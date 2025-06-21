import { useCallback } from 'react';

import { Button } from '../../Button';
import { InlineInput } from '../../InlineInput/InlineInput';

import style from './NewFretsOption.module.scss';

const NewFretsOption = (props) => {
  const { onAddMultipleFrets } = props;

  const onSubmitAddMultipleFrets = useCallback((event) => {
    event.preventDefault();

    onAddMultipleFrets(+event.target.qty.value);
  }, [ onAddMultipleFrets ]);

  return (
    <form className={style.NewFretsOption} onSubmit={onSubmitAddMultipleFrets}>
      <InlineInput
        label="New Frets"
        type="number"
        name="qty"
      />

      <Button>Add</Button>
    </form>
  );
};

export { NewFretsOption };
