import { useCallback, useRef } from 'react';

import { Button } from '../Button';
import { Checkbox } from '../Checkbox';

import style from './ChartControllers.module.scss';

const ChartControllers = (props) => {
  const { onSaveSong, onChangeWrapCheckbox, onAddMultipleFrets } = props;

  const addFretsInput = useRef(null);

  const onSubmitAddMultipleFrets = useCallback((event) => {
    event.preventDefault();

    onAddMultipleFrets(+addFretsInput.current?.value);
  }, [ onAddMultipleFrets ]);

  return (
    <div className={style.ChartControllers}>
      <Button onClick={onSaveSong}>Save Changes</Button>

      <Checkbox
        label="Wrap"
        initialValue={true}
        onChange={onChangeWrapCheckbox}
      />

      <form onSubmit={onSubmitAddMultipleFrets}>
        <input type="number" name="add-frets-qty" ref={addFretsInput} />
        <Button>Add</Button>
      </form>
    </div>
  );
};

export { ChartControllers };
