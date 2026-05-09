import { useAbly, useChannel } from 'ably/react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, FieldWithLabel, Input } from '@/components';
import { SOCKET_CHANNEL, SOCKET_EVENT_NAME_MAPPER } from '@/constants';

import style from './NewNotesOption.module.scss';

const NewNotesOption = (props) => {
  const { notesFnsRef, songId, setChangesLog } = props;

  const { t } = useTranslation();

  const ably = useAbly();
    
  const { publish } = useChannel(SOCKET_CHANNEL, (message) => {
    if(ably.connection.id != message.connectionId) {
      const { name, data } = message;
        
      if(data.id != songId) {
        return;
      }

      if(name == SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_CHANGES_LOG) {
        data.changesLog?.forEach(changeLog => {
          const { action, data } = changeLog;

          if(action == SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_ADD_MULTIPLE_NOTES) {
            onAddMultipleNotes(data.qty);
            return;
          }
        });

        return;
      }
    
      if(name == SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_ADD_MULTIPLE_NOTES) {
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

    const publishData = {
      id: songId,
      qty,
    };

    setChangesLog((currentChangesLog) => {
      return [
        ...currentChangesLog,
        {
          action: SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_ADD_MULTIPLE_NOTES,
          data: publishData,
        },
      ];
    });

    publish(SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_ADD_MULTIPLE_NOTES, publishData);
  }, [ onAddMultipleNotes, publish, setChangesLog, songId ]);

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
