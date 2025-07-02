import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '../../Button';
import { FieldWithLabel } from '../../FieldWithLabel';
import { Input } from '../../Input';

import style from './NewNotesOption.module.scss';

const NewNotesOption = (props) => {
  const { notesFnsRef } = props;

  const { t } = useTranslation();

  const onAddMultipleNotes = useCallback((qty) => {
    notesFnsRef.current?.addMultipleNotes(qty);
  }, [ notesFnsRef ]);

  const onSubmitAddMultipleNotes = useCallback((event) => {
    event.preventDefault();

    onAddMultipleNotes(+event.target.qty.value);
  }, [ onAddMultipleNotes ]);

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
