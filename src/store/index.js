import { configureStore } from '@reduxjs/toolkit';

import { SongsSlice, UserSlice } from './slices';

export const store = configureStore({
  reducer: {
    songs: SongsSlice,
    users: UserSlice,
  },
});
