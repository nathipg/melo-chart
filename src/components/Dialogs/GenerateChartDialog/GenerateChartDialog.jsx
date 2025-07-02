import { memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '../../Button';
import { Dialog } from '../../Dialog';
import { FieldWithLabel } from '../../FieldWithLabel';
import { TextArea } from '../../TextArea';

const GenerateChartDialog = (props) => {
  const { generateChartDialogFnsRef } = props;
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

  const breakTextInNote = useCallback((event) => {
    if(!lyricsTextAreaRef.current) {
      return;
    }
  
    onAddWordsAsNotes(lyricsTextAreaRef.current?.value);
  
    event.target.value = '';
    setShow(false);
  }, [ onAddWordsAsNotes ]);

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
