import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, InlineInput } from '../../components';

import style from './Login.module.scss';

const Login = () => {
  const { t } = useTranslation();

  const [ loginForm, setLoginForm ] = useState(true);

  const [ username, setUserName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const onSubmitLogin = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onSubmitSignUp = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <div className={style.LoginContainer}>
      <form className={style.Login} onSubmit={loginForm ? onSubmitLogin: onSubmitSignUp}>
        <h2>{loginForm ? t('Login') : t('Create an Account')}</h2>

        {
          loginForm ? (
            <></>
          ) : (
            <InlineInput
              label={t('Username')}
              type="text"
              name="username"
              value={username}
              onChange={(event) => setUserName(event.target.value)}
            />
          )
        }

        <InlineInput
          label={t('Email')}
          type="text"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <InlineInput
          label={t('Password')}
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button category={ButtonConstants.ButtonCategories.SUCCESS}>{loginForm ? t('Sign in') : t('Sign up')}</Button>
      </form>

      {
        loginForm ? (
          <Button
            category={ButtonConstants.ButtonCategories.PRIMARY}
            textOnly={true}
            onClick={() => setLoginForm(false)}
          >
            {t('Don\'t have an account? Sign up')}
          </Button>
        ) : (
          <Button
            category={ButtonConstants.ButtonCategories.PRIMARY}
            textOnly={true}
            onClick={() => setLoginForm(true)}
          >
            {t('Go back')}
          </Button>
        )
      }
    </div>
  );
};

const LoginMemo = memo(Login);

export { LoginMemo as Login };
