import { configureStore } from '@reduxjs/toolkit';

import { songsSlice } from './slices';

export const store = configureStore({
  reducer: {
    songs: songsSlice,
  },
});
