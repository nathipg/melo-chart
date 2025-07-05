import { createSlice } from '@reduxjs/toolkit';

import { SLICE_PART } from '../constants';
import { allAllExtraReducers, buildSlicePart } from '../sliceUtils';

import { SONG_SLICE_NAME } from './constants';
import * as slices from './slices';

const initialState = buildSlicePart(slices, SLICE_PART.INITIAL_STATE);

const songsSlice = createSlice({
  name: SONG_SLICE_NAME,
  initialState,
  reducers: buildSlicePart(slices, SLICE_PART.REDUCERS),
  extraReducers(builder) {
    allAllExtraReducers(builder, slices);
  },
});

export default songsSlice.reducer;

export const songsSliceActions = {
  ...songsSlice.actions,
  ...buildSlicePart(slices, SLICE_PART.ASYNC_THUNK),
};

export const songsSliceSelectors = {
  ...buildSlicePart(slices, SLICE_PART.SELECTORS),
};
