import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import { usersService } from '@/services';

import { USER_SLICE_NAME } from '../constants';

// Initial State
const initialState = {
  signUpStatus: REQUEST_STATUS.IDLE,
};

// Reducers
const reducers = {
};

// Async Thunk
const asyncThunk = {
  signUpUser: createAsyncThunk(`${USER_SLICE_NAME}/signUpUser`, async (user) => await usersService.signUpUser(user)),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.signUpUser.pending, (state) => {
      state.signUpStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.signUpUser.fulfilled, (state) => {
      state.signUpStatus = REQUEST_STATUS.SUCCEEDED;
    })
    .addCase(asyncThunk.signUpUser.rejected, (state) => {
      state.signUpStatus = REQUEST_STATUS.FAILED;
    })
  ;
};

// Selectors
const selectors = {
};

export const SignUpUser = {
  initialState,
  asyncThunk,
  reducers,
  extraReducers,
  selectors,
};
