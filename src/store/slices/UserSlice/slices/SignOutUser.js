import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import i18n from '@/i18n';
import { usersService } from '@/services';

import { USER_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  signOutStatus: REQUEST_STATUS.IDLE,
  signOutError: null,
};

// Async Thunk
const asyncThunk = {
  signOutUser: createAsyncThunk(`${USER_SLICE_NAME}/signOut`, async () => await usersService.signOut()),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.signOutUser.pending, (state) => {
      state.signOutStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.signOutUser.fulfilled, (state) => {
      state.signOutStatus = REQUEST_STATUS.SUCCEEDED;
      state.loggedUser = null;
    })
    .addCase(asyncThunk.signOutUser.rejected, (state, action) => {
      state.signOutStatus = REQUEST_STATUS.FAILED;
      state.loggedUserError = t(`error-message.sign-out-user.${action.error.code}`);
    })
  ;
};

export const SignOutUser = {
  initialState,
  asyncThunk,
  extraReducers,
};
