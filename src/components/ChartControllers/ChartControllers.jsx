import { Button } from '../Button';
import { Checkbox } from '../Checkbox';

import style from './ChartControllers.module.scss';

const ChartControllers = (props) => {
  const { onSaveSong, onChangeWrapCheckbox } = props;

  return (
    <div className={style.ChartControllers}>
      <Button onClick={onSaveSong}>Save Changes</Button>

      <Checkbox
        label="Wrap"
        initialValue={true}
        onChange={onChangeWrapCheckbox}
      />
    </div>
  );
};

export { ChartControllers };
