import { createSlice } from '@reduxjs/toolkit';

import { SLICE_PART } from '../constants';
import { allAllExtraReducers, buildSlicePart } from '../sliceUtils';

import { USER_SLICE_NAME } from './constants';
import * as slices from './slices';

const initialState = buildSlicePart(slices, SLICE_PART.INITIAL_STATE);

const usersSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: buildSlicePart(slices, SLICE_PART.REDUCERS),
  extraReducers(builder) {
    allAllExtraReducers(builder, slices);
  },
});

export default usersSlice.reducer;

export const usersSliceActions = {
  ...usersSlice.actions,
  ...buildSlicePart(slices, SLICE_PART.ASYNC_THUNK),
};

export const usersSliceSelectors = {
  ...buildSlicePart(slices, SLICE_PART.SELECTORS),
};
