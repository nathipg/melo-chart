import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../../constants';
import i18n from '../../../../i18n';
import { usersService } from '../../../../services';
import { USER_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  loggedUser: null,
};

// Async Thunk
const asyncThunk = {
  loadUser: createAsyncThunk(`${USER_SLICE_NAME}/loadUser`, async (user) => await usersService.loadUser(user)),
};

// Extra Reducers
const extraReducers = {
  addLoggedUserCases: (builder) => {
    builder
      .addCase(asyncThunk.loadUser.pending, (state) => {
        state.loggedUserStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(asyncThunk.loadUser.fulfilled, (state, action) => {
        state.loggedUserStatus = REQUEST_STATUS.SUCCEEDED;
        state.loggedUser = action.payload;
      })
      .addCase(asyncThunk.loadUser.rejected, (state, action) => {
        state.loggedUserStatus = REQUEST_STATUS.FAILED;
        state.loggedUserError = t(`error-message.logged-user.${action.error.message}`);
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

export const LoggedUser = {
  initialState,
  asyncThunk,
  extraReducers,
  selectors,
};
