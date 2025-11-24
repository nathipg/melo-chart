import { useAbly, useChannel } from 'ably/react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '@/components';

import style from './TrimOptions.module.scss';

const TrimOptions = (props) => {
  const { notesFnsRef, songId } = props;

  const { t } = useTranslation();

  const ably = useAbly();

  const { publish } = useChannel('melo-chart-song-updates', (message) => {
    if(ably.connection.id != message.connectionId) {
      const { name, data } = message;
    
      if(data.id != songId) {
        return;
      }

      if(name == 'update-chart-trim') {
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
    publish('update-chart-trim', {
      id: songId,
    });
  }, [ publish, songId, trimChart ]);

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
