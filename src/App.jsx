import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router';

import { Default } from './layouts';
import { Chart, Home, Login } from './pages';
import { songsSliceActions } from './store/slices';

import './global.scss';

const router = createHashRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'chart', element: <Chart /> },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(songsSliceActions.fetchSongs());
  }, [ dispatch ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

const AppMemo = memo(App);

export { AppMemo as App };
