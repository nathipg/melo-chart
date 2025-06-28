import { configureStore } from '@reduxjs/toolkit';

import { SongsSlice } from './slices';

export const store = configureStore({
  reducer: {
    songs: SongsSlice,
  },
});
