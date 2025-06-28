import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';

import { Default } from './layouts';
import { Chart, Home } from './pages';
import { songsSliceFns } from './store/slices/song-slice';

import './global.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(songsSliceFns.fetchSongs());
  }, [ dispatch ]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Home />} />
          <Route path="/chart" element={<Chart />} />
        </Route>
      </Routes>
    </>
  );
};

const AppMemo = memo(App);

export { AppMemo as App };
