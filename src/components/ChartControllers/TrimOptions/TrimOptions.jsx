import { memo, useCallback } from 'react';

import { Button, ButtonConstants } from '../../Button';

import style from './TrimOptions.module.scss';

const TrimOptions = (props) => {
  const { onTrimPitches, onRemoveEmptyFretsAtTheEnd } = props;

  const onTrimChart = useCallback(() => {
    onRemoveEmptyFretsAtTheEnd();
    onTrimPitches();
  }, [ onRemoveEmptyFretsAtTheEnd, onTrimPitches ]);

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

const TrimOptionsMemo = memo(TrimOptions);

export { TrimOptionsMemo as TrimOptions };
