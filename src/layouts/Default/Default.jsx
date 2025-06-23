import { memo } from 'react';
import { Outlet } from 'react-router';

import { Link } from '../../components';

import style from './Default.module.scss';

const Header = () => {
  return (
    <div className={style.Header}>
      <h1>Melo Chart</h1>
      <ul>
        <li>
          <Link to={{ pathname: '/' }}>My songs</Link>
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
      <Header />

      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </div>
  );
};

const DefaultMemo = memo(Default);

export { DefaultMemo as Default };
