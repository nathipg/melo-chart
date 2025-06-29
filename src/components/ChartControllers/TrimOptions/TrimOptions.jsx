import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '../../Button';

import style from './TrimOptions.module.scss';

const TrimOptions = (props) => {
  const { onTrimPitches, onRemoveEmptyNotesAtTheEnd } = props;

  const { t } = useTranslation();

  const onTrimChart = useCallback(() => {
    onRemoveEmptyNotesAtTheEnd();
    onTrimPitches();
  }, [ onRemoveEmptyNotesAtTheEnd, onTrimPitches ]);

  return (
    <div className={style.TrimOptions}>
      <Button
        category={ButtonConstants.ButtonCategories.TEXT_DANGER}
        onClick={onTrimChart}
      >
        {t('Trim Chart')}
      </Button>
    </div>
  );
};

const TrimOptionsMemo = memo(TrimOptions);

export { TrimOptionsMemo as TrimOptions };
