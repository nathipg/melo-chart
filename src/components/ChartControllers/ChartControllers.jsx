import { Button, ButtonConstants } from '../Button';
import { Checkbox } from '../Checkbox';

import { NewFretsOption } from './NewFretsOption';
import { NewStringsOption } from './NewStringsOption';

import style from './ChartControllers.module.scss';

const ChartControllers = (props) => {
  const { onSaveSong, onChangeWrapCheckbox, onAddMultipleFrets, onAddMultipleStrings } = props;

  return (
    <div className={style.ChartControllers}>
      <Button
        className={style.SaveSongButton}
        onClick={onSaveSong}
        category={ButtonConstants.ButtonCategories.SUCCESS}
      >
        Save Changes
      </Button>

      <NewFretsOption
        onAddMultipleFrets={onAddMultipleFrets}
      />

      <NewStringsOption
        onAddMultipleStrings={onAddMultipleStrings}
      />

      <Checkbox
        className={style.WrapCheckbox}
        label="Wrap"
        initialValue={true}
        onChange={onChangeWrapCheckbox}
      />
    </div>
  );
};

export { ChartControllers };
