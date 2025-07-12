import { configureStore } from '@reduxjs/toolkit';

import { SongSlice, UserSlice } from './slices';

export const store = configureStore({
  reducer: {
    songs: SongSlice.reducer,
    users: UserSlice.reducer,
  },
});
