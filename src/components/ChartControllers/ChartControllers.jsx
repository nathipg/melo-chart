import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '../Button';

import { NewNotesOption } from './NewNotesOption';
import { NewPitchesOption } from './NewPitchesOption';
import { TrimOptions } from './TrimOptions';

import style from './ChartControllers.module.scss';

const ChartControllers = (props) => {
  const { notesFnsRef, generateChartDialogFnsRef } = props;

  const { t } = useTranslation();

  return (
    <div className={style.ChartControllers}>
      <Button
        category={ButtonConstants.ButtonCategories.DANGER}
        onClick={() => generateChartDialogFnsRef.current?.show()}
      >
        {t('Generate mapping with lyrics')}
      </Button>

      <NewNotesOption
        notesFnsRef={notesFnsRef}
      />

      <NewPitchesOption
        notesFnsRef={notesFnsRef}
      />

      <TrimOptions
        notesFnsRef={notesFnsRef}
      />
    </div>
  );
};

const ChartControllersMemo = memo(ChartControllers);

export { ChartControllersMemo as ChartControllers };
