import { memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '../Button';
import { Dialog } from '../Dialog';

import style from './GenerateChartDialog.module.scss';

const GenerateChartDialog = (props) => {
  const { show: initialShow, generateChartDialogFnsRef } = props;
  const { onAddWordsAsNotes } = props;

  const { t } = useTranslation();

  const lyricsTextAreaRef = useRef(null);

  const [ show, setShow ] = useState(initialShow);

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
        <>
          <textarea
            ref={lyricsTextAreaRef}
            className={style.LyricsTextArea}
            placeholder={t('Song lyrics')}
          >
          </textarea>
        </>
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
