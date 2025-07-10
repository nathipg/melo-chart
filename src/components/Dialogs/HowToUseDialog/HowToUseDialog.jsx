import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '../../Button';
import { Dialog, DialogConstants } from '../../Dialog';
import { CircleQuestionIcon } from '../../Icons';

import style from './HowToUseDialog.module.scss';

const HowToUseDialog = () => {
  const { t } = useTranslation();

  const [ show, setShow ] = useState(false);

  return (
    <>
      <Button
        category={ButtonConstants.ButtonCategories.PRIMARY}
        onClick={() => setShow(true)}
        icon={<CircleQuestionIcon />}
      >
        {t('How to Use')}
      </Button>

      {
        show ? (
          <Dialog
            title={t('How to Use')}
            size={DialogConstants.DialogSizes.LARGE}
            bodyContent={
              <>
                <div className={style.TableContainer}>
                  <h3>{t('Notes')}</h3>

                  <table className={style.Table}>
                    <thead>
                      <tr>
                        <td>{t('Action')}</td>
                        <td>{t('How To Do')}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{t('Edit Note')}</td>
                        <td>{t('Click the note')}</td>
                      </tr>
                      <tr>
                        <td>{t('Break Word Into Notes')}</td>
                        <td>{t('Add spaces between letters and hit enter (or click outside)')}</td>
                      </tr>
                      <tr>
                        <td>{t('Change Note Pitch')}</td>
                        <td>{t('Click and hold the note, then drag it to the new position')}</td>
                      </tr>
                      <tr>
                        <td>{t('Add Note')}</td>
                        <td>{t('Right-click a note in the chart')}</td>
                      </tr>
                      <tr>
                        <td>{t('Remove Note')}</td>
                        <td>{t('Right-click a note in the chart')}</td>
                      </tr>
                      <tr>
                        <td>{t('Add Multiple Notes')}</td>
                        <td>{t('Click in "Configure Song" button')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className={style.TableContainer}>
                  <h3>{t('Pitches')}</h3>

                  <table className={style.Table}>
                    <thead>
                      <tr>
                        <td>{t('Action')}</td>
                        <td>{t('How To Do')}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{t('Add Pitch')}</td>
                        <td>{t('Right-click a note in the chart')}</td>
                      </tr>
                      <tr>
                        <td>{t('Remove Pitch')}</td>
                        <td>{t('Right-click a note in the chart')}</td>
                      </tr>
                      <tr>
                        <td>{t('Add Multiple Pitches')}</td>
                        <td>{t('Click in "Configure Song" button')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className={style.TableContainer}>
                  <h3>{t('Keyboard Shortcuts when Editing Note')}</h3>
                  <table className={style.Table}>
                    <thead>
                      <tr>
                        <td>{t('Action')}</td>
                        <td>{t('How To Do')}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{t('Save')}</td>
                        <td>{t('Enter')}</td>
                      </tr>
                      <tr>
                        <td>{t('Cancel')}</td>
                        <td>{t('Esc')}</td>
                      </tr>
                      <tr>
                        <td>{t('Navigate Notes')}</td>
                        <td>{t('Tab or Shift + Tab')}</td>
                      </tr>
                      <tr>
                        <td>{t('Navigate Pitches')}</td>
                        <td>{t('Arrow Up or Arrow Down')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            }
            footerContent={
              <>
                <Button
                  onClick={() => setShow(false)}
                >
                  {t('Close')}
                </Button>
              </>
            }
          />
        ) : <></>
      }
    </>
  );
};

const HowToUseDialogMemo = memo(HowToUseDialog);

export { HowToUseDialogMemo as HowToUseDialog };
