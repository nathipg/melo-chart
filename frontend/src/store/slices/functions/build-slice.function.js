import { createSlice } from '@reduxjs/toolkit';

import { SLICE_PART } from '../constants';

import { addAllExtraReducers } from './add-all-extra-reducers.function';
import { buildSlicePart } from './build-slice-part.function';


export const buildSlice = (data) => {
  const { sliceName, sliceParts } = data;

  const initialState = buildSlicePart(sliceParts, SLICE_PART.INITIAL_STATE);

  const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: buildSlicePart(sliceParts, SLICE_PART.REDUCERS),
    extraReducers(builder) {
      addAllExtraReducers(builder, sliceParts);
    },
  });

  const actions = {
    ...slice.actions,
    ...buildSlicePart(sliceParts, SLICE_PART.ASYNC_THUNK),
  };

  const selectors = {
    ...buildSlicePart(sliceParts, SLICE_PART.SELECTORS),
  };

  return {
    reducer: slice.reducer,
    actions,
    selectors,
  };
};
