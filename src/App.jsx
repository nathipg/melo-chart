import { onAuthStateChanged } from 'firebase/auth';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createHashRouter, Navigate, RouterProvider } from 'react-router';

import { Default } from './layouts';
import { Chart, Home, Login } from './pages';
import { firebaseService } from './services';
import { songsSliceActions, usersSliceActions, usersSliceSelectors } from './store/slices';

import './global.scss';

const router = createHashRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      { index: true, element: <Login /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]);

const authRouter = createHashRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      { index: true, element: <Home /> },
      { path: 'chart', element: <Chart /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();

  const loggedUser = useSelector(usersSliceSelectors.selectLoggedUser);
  const isLoggedIn = useSelector(usersSliceSelectors.isLoggedIn);

  useEffect(() => {
    if(loggedUser) {
      dispatch(songsSliceActions.loadSongs(loggedUser.songs));
    }
  }, [ dispatch, loggedUser ]);

  useEffect(()=>{
    onAuthStateChanged(firebaseService.auth.auth, (user) => {
      if (user) {
        dispatch(usersSliceActions.loadUser(user));
      }
    });
  }, [ dispatch ]);

  return (
    <>
      <RouterProvider router={isLoggedIn ? authRouter : router} />
    </>
  );
};

const AppMemo = memo(App);

export { AppMemo as App };
