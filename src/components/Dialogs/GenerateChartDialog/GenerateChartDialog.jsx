import { useAbly, useChannel } from 'ably/react';
import { memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, Dialog, FieldWithLabel, TextArea } from '@/components';
import { SOCKET_CHANNEL, SOCKET_EVENT_NAME_MAPPER } from '@/constants';

const GenerateChartDialog = (props) => {
  const { generateChartDialogFnsRef, songId, setChangesLog } = props;
  const { onAddWordsAsNotes } = props;

  const { t } = useTranslation();

  const lyricsTextAreaRef = useRef(null);

  const [ show, setShow ] = useState(false);

  useImperativeHandle(generateChartDialogFnsRef, () => {
    return {
      show() {
        setShow(true);
      },
    };
  });

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

          if(action == SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_GENERATE_BY_LYRICS) {
            onAddWordsAsNotes(data.lyrics);
            return;
          }
        });

        return;
      }
  
      if(name == SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_GENERATE_BY_LYRICS) {
        onAddWordsAsNotes(data.lyrics);
        return;
      }
    }
  });

  const breakTextInNote = useCallback((event) => {
    if(!lyricsTextAreaRef.current) {
      return;
    }
  
    const lyrics = lyricsTextAreaRef.current?.value;
    onAddWordsAsNotes(lyrics);

    const publishData = {
      id: songId,
      lyrics,
    };

    setChangesLog((currentChangesLog) => {
      return [
        ...currentChangesLog,
        {
          action: SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_GENERATE_BY_LYRICS,
          data: publishData,
        },
      ];
    });

    publish(SOCKET_EVENT_NAME_MAPPER.UPDATE_CHART_GENERATE_BY_LYRICS, publishData);
  
    event.target.value = '';
    setShow(false);
  }, [ onAddWordsAsNotes, publish, setChangesLog, songId ]);

  if(!show) {
    return <></>;
  }

  return (
    <Dialog
      title={t('Generate mapping with lyrics')}
      bodyContent={
        <FieldWithLabel
          label={t('Song lyrics')}
          field={(
            <TextArea
              ref={lyricsTextAreaRef}
            />
          )}
        />
      }
      footerContent={
        <>
          <Button
            category={ButtonConstants.ButtonCategories.DANGER}
            onClick={breakTextInNote}
          >
            {t('Generate')}
          </Button>
          <Button
            category={ButtonConstants.ButtonCategories.DEFAULT}
            onClick={() => setShow(false)}
          >
            {t('Cancel')}
          </Button>
        </>
      }
    />
  );
};

const GenerateChartDialogMemo = memo(GenerateChartDialog);

export { GenerateChartDialogMemo as GenerateChartDialog };
