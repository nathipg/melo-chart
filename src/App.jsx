import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

import { Default } from './layouts';
import { Chart, Home } from './pages';
import { songService } from './services';

import './global.scss';

const App = () => {
  const [ songs, setSongs ] = useState([]);

  useEffect(() => {
    (async () => {
      const songList = await songService.getSongs();
      setSongs(songList);
    })();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Home songs={songs} setSongs={setSongs} />} />
          <Route path="/chart" element={<Chart songs={songs} setSongs={setSongs} />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
