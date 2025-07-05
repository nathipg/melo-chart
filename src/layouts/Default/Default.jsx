import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';

import { Button, ButtonConstants, GrowlContainer, Link } from '../../components';
import { usersSliceActions, usersSliceSelectors } from '../../store/slices';

import style from './Default.module.scss';

const Header = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(usersSliceSelectors.isLoggedIn);

  const onLogout = useCallback((event) => {
    event.preventDefault();

    dispatch(usersSliceActions.signOutUser());
  }, [ dispatch ]);

  return (
    <div className={style.Header}>
      <h1>Melo Chart</h1>
      {
        isLoggedIn ? (
          <>
            <ul>
              <li>
                <Link to={{ pathname: '' }}>{t('My songs')}</Link>
              </li>
            </ul>
            <Button
              className={style.SignOut}
              category={ButtonConstants.ButtonCategories.DANGER}
              textOnly={true}
              onClick={onLogout}
            >
              {t('Sign Out')}
            </Button>
          </>
        ) : <></>
      }
    </div>
  );
};

const ContentContainer = (props) => {
  const { children } = props;

  return (
    <div className={style.ContentContainer}>
      {children}
    </div>
  );
};

const Default = () => {
  return (
    <>
      <GrowlContainer />
      
      <Header />

      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </>
  );
};

const DefaultMemo = memo(Default);

export { DefaultMemo as Default };
