import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { Default } from './layouts';
import { Chart, Home } from './pages';
import { songsSliceActions } from './store/slices';

import './global.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      { index: true, element: <Home /> },
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
