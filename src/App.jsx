import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Route, Routes } from 'react-router';

import { Default } from './layouts';
import { Chart, Home } from './pages';

import './global.scss';

const mockedFrets = [
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'Quem' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'não' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'tem' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'te' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'to' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'de' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'vi-dro' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'que' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'a' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'ti' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'rea' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'pri' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'mei' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'ra' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },

  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'Quem' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'não' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'tem' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'te' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'to' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'de' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'vi-dro' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'que' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'a' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'ti' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'rea' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'pri' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'mei' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'ra' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },

  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'Quem' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'não' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'tem' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'te' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'to' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'de' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'vi-dro' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'que' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'a' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'ti' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'rea' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'pri' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'mei' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'ra' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },

  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'Quem' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'não' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'tem' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'te' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'to' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'de' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'vi-dro' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'que' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'a' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'ti' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: 'rea' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'pri' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'mei' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
  {
    id: nanoid(),
    chunks: [
      { id: nanoid(), text: '' },
      { id: nanoid(), text: 'ra' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
      { id: nanoid(), text: '' },
    ],
  },
];

const mockedSongs = [
  {
    id: 1,
    title: 'Teto de Vidro - Pitty',
    frets: mockedFrets,
  },
];

const App = () => {
  const [ songs, setSongs ] = useState(mockedSongs);

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
