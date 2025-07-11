import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router';

import { BarsIcon, BlockUI, Button, ButtonConstants, GrowlContainer, Link, MeloChartIcon } from '../../components';
import { usersSliceActions, usersSliceSelectors } from '../../store/slices';

import style from './Default.module.scss';

const Header = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(usersSliceSelectors.isLoggedIn);

  const [ menuOpened, setMenuOpened ] = useState(false);

  const onLogout = useCallback((event) => {
    event.preventDefault();

    dispatch(usersSliceActions.signOutUser());
  }, [ dispatch ]);

  return (
    <div className={style.HeaderBar}>
      <div className={style.Header}>
        <MeloChartIcon />

        <h1>Melo Chart</h1>

        {
          isLoggedIn ? (
            <>
              <div className={style.MenuOptionsSmallOrBigger}>
                <ul>
                  <li>
                    <Link to={{ pathname: '' }}>{t('My songs')}</Link>
                  </li>
                </ul>
                <Button
                  category={ButtonConstants.ButtonCategories.DANGER}
                  textOnly={true}
                  onClick={onLogout}
                >
                  {t('Sign Out')}
                </Button>
              </div>

              <div className={style.MenuOptionsExtraSmall}>
                <Button
                  onClick={() => setMenuOpened(currentMenuOpened => !currentMenuOpened)}
                >
                  <BarsIcon />
                </Button>
              </div>
            </>
          ) : <></>
        }
      </div>

      {
        isLoggedIn && menuOpened ? (
          <div className={style.MenuOptionsContainer}>
            <ul>
              <li>
                <Link to={{ pathname: '' }}>{t('My songs')}</Link>
              </li>

              <li className={style.DivisorTop}>
                <Button
                  category={ButtonConstants.ButtonCategories.DANGER}
                  textOnly={true}
                  onClick={onLogout}
                >
                  {t('Sign Out')}
                </Button>
              </li>
            </ul>
          </div>
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
  const location = useLocation();

  const isFirebaseOnAuthStateChangedStatusComplete = useSelector(usersSliceSelectors.isFirebaseOnAuthStateChangedStatusComplete);

  const isPageLoaded = useMemo(() => {
    const hasURLRedirectSearch = location.search.startsWith('?url=');

    return isFirebaseOnAuthStateChangedStatusComplete && !hasURLRedirectSearch;
  }, [ isFirebaseOnAuthStateChangedStatusComplete, location.search ]);

  return (
    <>
      <GrowlContainer />
      
      <Header />

      <ContentContainer>
        <Outlet />
      </ContentContainer>

      {/* { !isPageLoaded ? <BlockUI /> : <></>} */}
    </>
  );
};

const DefaultMemo = memo(Default);

export { DefaultMemo as Default };
