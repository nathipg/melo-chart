import { useAbly, useChannel } from 'ably/react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, FieldWithLabel, Input } from '@/components';

import style from './NewNotesOption.module.scss';

const NewNotesOption = (props) => {
  const { notesFnsRef, songId } = props;

  const { t } = useTranslation();

  const ably = useAbly();
    
  const { publish } = useChannel('melo-chart-song-updates', (message) => {
    if(ably.connection.id != message.connectionId) {
      const { name, data } = message;
        
      if(data.id != songId) {
        return;
      }
    
      if(name == 'update-chart-add-multiple-notes') {
        onAddMultipleNotes(data.qty);
      }
    }
  });

  const onAddMultipleNotes = useCallback((qty) => {
    notesFnsRef.current?.addMultipleNotes(qty);
  }, [ notesFnsRef ]);

  const onSubmitAddMultipleNotes = useCallback((event) => {
    event.preventDefault();

    const qty = +event.target.qty.value;

    onAddMultipleNotes(qty);
    publish('update-chart-add-multiple-notes', {
      id: songId,
      qty,
    });
  }, [ onAddMultipleNotes, publish, songId ]);

  return (
    <form className={style.NewNotesOption} onSubmit={onSubmitAddMultipleNotes}>
      <FieldWithLabel
        label={t('New Notes')}
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

const NewNotesOptionMemo = memo(NewNotesOption);

export { NewNotesOptionMemo as NewNotesOption };
