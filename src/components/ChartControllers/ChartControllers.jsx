import { Button } from '../Button';
import { Checkbox } from '../Checkbox';

import { NewFretsOption } from './NewFretsOption';
import { NewStringsOption } from './NewStringsOption';

import style from './ChartControllers.module.scss';

const ChartControllers = (props) => {
  const { onSaveSong, onChangeWrapCheckbox, onAddMultipleFrets, onAddMultipleStrings } = props;

  return (
    <div className={style.ChartControllers}>
      <Button onClick={onSaveSong}>Save Changes</Button>

      <Checkbox
        label="Wrap"
        initialValue={true}
        onChange={onChangeWrapCheckbox}
      />

      <NewFretsOption
        onAddMultipleFrets={onAddMultipleFrets}
      />

      <NewStringsOption
        onAddMultipleStrings={onAddMultipleStrings}
      />
    </div>
  );
};

export { ChartControllers };
