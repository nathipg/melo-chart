import { memo, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Button, ButtonConstants, FieldWithLabel, Input, RightToBracketIcon, UserPlusIcon } from '@/components';
import { UserSlice } from '@/store/slices';

import style from './Login.module.scss';

const Login = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const usernameInputRef = useRef(null);

  const [ loginForm, setLoginForm ] = useState(true);

  const [ username, setUserName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const getFormUsername = useCallback(() => {
    const isUsernameInputFocused = usernameInputRef.current === document.activeElement;

    if(username || isUsernameInputFocused) {
      return username;
    }

    const splitEmail = email.split('@');

    return splitEmail[0] || '';
  }, [ email, username ]);

  const onSubmitLogin = useCallback((event) => {
    event.preventDefault();

    dispatch(UserSlice.actions.signInUser({
      email,
      password,
    }));
  }, [ dispatch, email, password ]);

  const onSubmitSignUp = useCallback((event) => {
    event.preventDefault();

    dispatch(UserSlice.actions.signUpUser({
      username: getFormUsername(),
      email,
      password,
    }));
  }, [ dispatch, email, getFormUsername, password ]);

  return (
    <div className={style.LoginContainer}>
      <form className={style.Login} onSubmit={loginForm ? onSubmitLogin: onSubmitSignUp}>
        <h2>{loginForm ? t('Login') : t('Create an Account')}</h2>

        <FieldWithLabel
          label={t('Email')}
          field={(
            <Input
              type="text"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          )}
        />

        <FieldWithLabel
          label={t('Password')}
          field={(
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          )}
        />

        {
          loginForm ? (
            <></>
          ) : (
            <FieldWithLabel
              label={t('Username')}
              field={(
                <Input
                  ref={usernameInputRef}
                  type="text"
                  name="username"
                  value={getFormUsername()}
                  onChange={(event) => setUserName(event.target.value)}
                />
              )}
            />
          )
        }

        <Button
          category={ButtonConstants.ButtonCategories.SUCCESS}
          icon={loginForm ? <RightToBracketIcon /> : <UserPlusIcon />}
        >
          {loginForm ? t('Sign in') : t('Sign up')}
        </Button>
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
