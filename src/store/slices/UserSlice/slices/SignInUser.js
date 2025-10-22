import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import { usersService } from '@/services';

import { USER_SLICE_NAME } from '../constants';

// Initial State
const initialState = {
  signInStatus: REQUEST_STATUS.IDLE,
};

// Reducers
const reducers = {
};

// Async Thunk
const asyncThunk = {
  signInUser: createAsyncThunk(`${USER_SLICE_NAME}/signInUser`, async (user) => await usersService.signInUser(user)),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.signInUser.pending, (state) => {
      state.signInStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.signInUser.fulfilled, (state, action) => {
      state.signInStatus = REQUEST_STATUS.SUCCEEDED;
      state.loggedUser = action.payload;
    })
    .addCase(asyncThunk.signInUser.rejected, (state) => {
      state.signInStatus = REQUEST_STATUS.FAILED;
    })
  ;
};

// Selectors
const selectors = {
};

export const SignInUser = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
