import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../../constants';
import i18n from '../../../../i18n';
import { usersService } from '../../../../services';
import { USER_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  signUpStatus: REQUEST_STATUS.IDLE,
  signUpError: null,
};

// Async Thunk
const asyncThunk = {
  signUpUser: createAsyncThunk(`${USER_SLICE_NAME}/signUpUser`, async (user) => await usersService.signUpUser(user)),
};

// Extra Reducers
const extraReducers = {
  addSignUpUserCases: (builder) => {
    builder
      .addCase(asyncThunk.signUpUser.pending, (state) => {
        state.signUpStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(asyncThunk.signUpUser.fulfilled, (state, action) => {
        state.signUpStatus = REQUEST_STATUS.SUCCEEDED;
        state.loggedUser = action.payload;
      })
      .addCase(asyncThunk.signUpUser.rejected, (state, action) => {
        state.signUpStatus = REQUEST_STATUS.FAILED;
        state.signUpError = t(`error-message.sign-up-user.${action.error.message}`);
      })
    ;
  },
};

export const SignUpUser = {
  asyncThunk,
  extraReducers,
  initialState,
};
