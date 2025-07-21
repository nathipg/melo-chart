import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import i18n from '@/i18n';
import { usersService } from '@/services';

import { USER_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  signInStatus: REQUEST_STATUS.IDLE,
  signInError: null,
};

// Reducers
const reducers = {
  clearSignInError: (state) => {
    state.signInError = null;
  },
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
    .addCase(asyncThunk.signInUser.rejected, (state, action) => {
      state.signInStatus = REQUEST_STATUS.FAILED;
      state.signInError = t(`error-message.sign-in-user.${action.error.code}`);
    })
  ;
};

// Selectors
const selectors = {
  selectSignInError: (state) => {
    return state.users.signInError;
  },
};

export const SignInUser = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
