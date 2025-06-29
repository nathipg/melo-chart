import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';

import { GrowlContainer, Link } from '../../components';

import style from './Default.module.scss';

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className={style.Header}>
      <h1>Melo Chart</h1>
      <ul>
        <li>
          <Link to={{ pathname: '' }}>{t('My songs')}</Link>
        </li>
      </ul>
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
    <div>
      <GrowlContainer />
      
      <Header />

      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </div>
  );
};

const DefaultMemo = memo(Default);

export { DefaultMemo as Default };
