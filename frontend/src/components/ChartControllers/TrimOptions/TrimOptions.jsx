import { useAbly, useChannel } from 'ably/react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '@/components';
import { SOCKET_CHANNEL, SOCKET_EVENT_NAME_MAPPER } from '@/constants';

import style from './TrimOptions.module.scss';

const TrimOptions = (props) => {
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
          const { action } = changeLog;

          if(action == SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_TRIM) {
            trimChart();
            return;
          }
        });

        return;
      }

      if(name == SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_TRIM) {
        trimChart();
      }
    }
  });

  const onTrimPitches = useCallback(() => {
    notesFnsRef.current?.trimPitches();
  }, [ notesFnsRef ]);

  const onRemoveEmptyNotesAtTheEnd = useCallback(() => {
    notesFnsRef.current?.removeEmptyNotesAtTheEnd();
  }, [ notesFnsRef ]);

  const trimChart = useCallback(() => {
    onRemoveEmptyNotesAtTheEnd();
    onTrimPitches();
  }, [ onRemoveEmptyNotesAtTheEnd, onTrimPitches ]);

  const onTrimChart = useCallback(() => {
    trimChart();
    const publishData = {
      id: songId,
    };

    setChangesLog((currentChangesLog) => {
      return [
        ...currentChangesLog,
        {
          action: SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_TRIM,
          data: publishData,
        },
      ];
    });

    publish(SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_TRIM, publishData);
  }, [ publish, setChangesLog, songId, trimChart ]);

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
