import { useCallback } from 'react';

import { Button, ButtonConstants } from '../../Button';

import style from './TrimOptions.module.scss';

const TrimOptions = (props) => {
  const { onTrimStrings, onRemoveEmptyFretsAtTheEnd } = props;

  const onTrimChart = useCallback(() => {
    onRemoveEmptyFretsAtTheEnd();
    onTrimStrings();
  }, [ onRemoveEmptyFretsAtTheEnd, onTrimStrings ]);

  return (
    <div className={style.TrimOptions}>
      <Button
        category={ButtonConstants.ButtonCategories.TEXT_DANGER}
        onClick={onTrimChart}
      >
        Trim Chart
      </Button>
    </div>
  );
};

export { TrimOptions };
