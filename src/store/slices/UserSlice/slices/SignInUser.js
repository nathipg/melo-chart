import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../../constants';
import i18n from '../../../../i18n';
import { usersService } from '../../../../services';
import { USER_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  loggedUser: null,
  signInStatus: REQUEST_STATUS.IDLE,
  signInError: null,
};

// Async Thunk
const asyncThunk = {
  signInUser: createAsyncThunk(`${USER_SLICE_NAME}/signInUser`, async (user) => await usersService.signInUser(user)),
};

// Extra Reducers
const extraReducers = {
  addSignInUserCases: (builder) => {
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
        state.signInError = t(`error-message.sing-in-user.${action.error.message}`);
      })
    ;
  },
};

// Selectors
const selectors = {
  selectLoggedUser: state => {
    return state.users.loggedUser;
  },
  isLoggedIn: state => {
    return !!state.users.loggedUser;
  },
};

export const SignInUser = {
  asyncThunk,
  extraReducers,
  initialState,
  selectors,
};
