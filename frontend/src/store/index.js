import { configureStore } from '@reduxjs/toolkit';

import { thunkGrowlMiddleware } from './middlewares';
import { GrowlSlice, SongSlice, UserSlice } from './slices';

export const store = configureStore({
  reducer: {
    songs: SongSlice.reducer,
    users: UserSlice.reducer,
    growls: GrowlSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(thunkGrowlMiddleware);
  },
});
