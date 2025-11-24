import { useAbly, useChannel } from 'ably/react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, FieldWithLabel, Input } from '@/components';

import style from './NewPitchesOption.module.scss';

const NewPitchesOption = (props) => {
  const { notesFnsRef, songId } = props;

  const { t } = useTranslation();

  const ably = useAbly();
  
  const { publish } = useChannel('melo-chart-song-updates', (message) => {
    if(ably.connection.id != message.connectionId) {
      const { name, data } = message;
      
      if(data.id != songId) {
        return;
      }
  
      if(name == 'update-chart-add-multiple-pitches') {
        onAddMultiplePitches(data.qty);
      }
    }
  });

  const onAddMultiplePitches = useCallback((qty) => {
    notesFnsRef.current?.addMultiplePitches(qty);
  }, [ notesFnsRef ]);

  const onSubmitAddMultiplePitches = useCallback((event) => {
    event.preventDefault();

    const qty = +event.target.qty.value;

    onAddMultiplePitches(qty);
    publish('update-chart-add-multiple-pitches', {
      id: songId,
      qty,
    });
  }, [ onAddMultiplePitches, publish, songId ]);

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
