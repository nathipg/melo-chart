import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '../../Button';

import style from './TrimOptions.module.scss';

const TrimOptions = (props) => {
  const { notesFnsRef } = props;

  const { t } = useTranslation();

  const onTrimPitches = useCallback(() => {
    notesFnsRef.current?.trimPitches();
  }, [ notesFnsRef ]);

  const onRemoveEmptyNotesAtTheEnd = useCallback(() => {
    notesFnsRef.current?.removeEmptyNotesAtTheEnd();
  }, [ notesFnsRef ]);

  const onTrimChart = useCallback(() => {
    onRemoveEmptyNotesAtTheEnd();
    onTrimPitches();
  }, [ onRemoveEmptyNotesAtTheEnd, onTrimPitches ]);

  return (
    <div className={style.TrimOptions}>
      <Button
        category={ButtonConstants.ButtonCategories.DANGER}
        onClick={onTrimChart}
        textOnly={true}
      >
        {t('Trim Chart')}
      </Button>
    </div>
  );
};

const TrimOptionsMemo = memo(TrimOptions);

export { TrimOptionsMemo as TrimOptions };
