import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '../../Button';
import { InlineInput } from '../../InlineInput';

import style from './NewNotesOption.module.scss';

const NewNotesOption = (props) => {
  const { onAddMultipleNotes } = props;

  const { t } = useTranslation();

  const onSubmitAddMultipleNotes = useCallback((event) => {
    event.preventDefault();

    onAddMultipleNotes(+event.target.qty.value);
  }, [ onAddMultipleNotes ]);

  return (
    <form className={style.NewNotesOption} onSubmit={onSubmitAddMultipleNotes}>
      <InlineInput
        label={t('New Notes')}
        type="number"
        name="qty"
      />

      <Button category={ButtonConstants.ButtonCategories.PRIMARY}>{t('Add')}</Button>
    </form>
  );
};

const NewNotesOptionMemo = memo(NewNotesOption);

export { NewNotesOptionMemo as NewNotesOption };
