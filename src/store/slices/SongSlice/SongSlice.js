import { createSlice } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../constants';

import { songSliceAsyncThunks } from './async-thunks';
import { SONG_SLICE_NAME } from './constants';
import { songSliceExtraReducers } from './extra-reducers';
import { songSliceFunctions } from './functions';
import { songSliceReducers } from './reducers';

const initialState = {
  songs: [],
  songsStatus: REQUEST_STATUS.IDLE,
  songsError: null,

  addSongStatus: REQUEST_STATUS.IDLE,
  addSongError: null,

  saveSongStatus: REQUEST_STATUS.IDLE,
  saveSongError: null,
};

const songsSlice = createSlice({
  name: SONG_SLICE_NAME,
  initialState,
  reducers: {
    ...songSliceReducers,
  },
  extraReducers(builder) {
    songSliceExtraReducers.addAllCases(builder);
  },
});

export default songsSlice.reducer;

export const songsSliceFns = {
  ...songsSlice.actions,
  ...songSliceFunctions,
  ...songSliceAsyncThunks,
};
