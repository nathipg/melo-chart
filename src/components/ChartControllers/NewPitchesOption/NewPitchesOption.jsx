import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, FieldWithLabel, Input } from '@/components';

import style from './NewPitchesOption.module.scss';

const NewPitchesOption = (props) => {
  const { notesFnsRef } = props;

  const { t } = useTranslation();

  const onAddMultiplePitches = useCallback((qty) => {
    notesFnsRef.current?.addMultiplePitches(qty);
  }, [ notesFnsRef ]);

  const onSubmitAddMultiplePitches = useCallback((event) => {
    event.preventDefault();

    onAddMultiplePitches(+event.target.qty.value);
  }, [ onAddMultiplePitches ]);

  return (
    <form className={style.NewPitchesOption} onSubmit={onSubmitAddMultiplePitches}>
      <FieldWithLabel
        label={t('New Pitches')}
        field={(
          <Input
            type="number"
            name="qty"
          />
        )}
      />

      <Button category={ButtonConstants.ButtonCategories.PRIMARY}>{t('Add')}</Button>
    </form>
  );
};

const NewPitchesOptionMemo = memo(NewPitchesOption);

export { NewPitchesOptionMemo as NewPitchesOption };
