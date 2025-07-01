import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createHashRouter, Navigate, RouterProvider } from 'react-router';

import { Default } from './layouts';
import { Chart, Home, Login } from './pages';
import { songsSliceActions, usersSliceSelectors } from './store/slices';

import './global.scss';

const router = createHashRouter([
  {
    path: '/',
    element: <Default isLoggedIn={false} />,
    children: [
      { index: true, element: <Login /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]);

const authRouter = createHashRouter([
  {
    path: '/',
    element: <Default isLoggedIn={true} />,
    children: [
      { index: true, element: <Home /> },
      { path: 'chart', element: <Chart /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(usersSliceSelectors.isLoggedIn);

  useEffect(() => {
    dispatch(songsSliceActions.fetchSongs());
  }, [ dispatch ]);

  return (
    <>
      <RouterProvider router={isLoggedIn ? authRouter : router} />
    </>
  );
};

const AppMemo = memo(App);

export { AppMemo as App };
