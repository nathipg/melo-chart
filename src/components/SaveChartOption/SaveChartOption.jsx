import { Button, ButtonConstants } from '../Button';

import style from './SaveChartOption.module.scss';

const SaveChartOption = (props) => {
  const { onSaveSong } = props;

  return (
    <div className={style.SaveChartOption}>
      <Button
        className={style.SaveSongButton}
        onClick={onSaveSong}
        category={ButtonConstants.ButtonCategories.SUCCESS}
      >
        Save Changes
      </Button>
    </div>
  );
};

export { SaveChartOption };
