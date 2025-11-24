import { useAbly, useChannel } from 'ably/react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, FieldWithLabel, Input } from '@/components';
import { SOCKET_CHANNEL, SOCKET_EVENT_NAME_MAPPER } from '@/constants';

import style from './NewPitchesOption.module.scss';

const NewPitchesOption = (props) => {
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

          if(action == SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_ADD_MULTIPLE_PITCHES) {
            onAddMultiplePitches(data.qty);
            return;
          }
        });

        return;
      }
  
      if(name == SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_ADD_MULTIPLE_PITCHES) {
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

    const publishData = {
      id: songId,
      qty,
    };

    setChangesLog((currentChangesLog) => {
      return [
        ...currentChangesLog,
        {
          action: SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_ADD_MULTIPLE_PITCHES,
          data: publishData,
        },
      ];
    });

    publish(SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_ADD_MULTIPLE_PITCHES, publishData);
  }, [ onAddMultiplePitches, publish, setChangesLog, songId ]);

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
