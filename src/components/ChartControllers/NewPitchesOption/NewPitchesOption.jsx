import { memo, useCallback } from 'react';

import { Button, ButtonConstants } from '../../Button';
import { InlineInput } from '../../InlineInput/InlineInput';

import style from './NewPitchesOption.module.scss';

const NewPitchesOption = (props) => {
  const { onAddMultiplePitches } = props;

  const onSubmitAddMultiplePitches = useCallback((event) => {
    event.preventDefault();

    onAddMultiplePitches(+event.target.qty.value);
  }, [ onAddMultiplePitches ]);

  return (
    <form className={style.NewPitchesOption} onSubmit={onSubmitAddMultiplePitches}>
      <InlineInput
        label="New Pitches"
        type="number"
        name="qty"
      />

      <Button category={ButtonConstants.ButtonCategories.PRIMARY}>Add</Button>
    </form>
  );
};

const NewPitchesOptionMemo = memo(NewPitchesOption);

export { NewPitchesOptionMemo as NewPitchesOption };
