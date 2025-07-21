import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import i18n from '@/i18n';
import { usersService } from '@/services';

import { USER_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  loggedUser: null,

  loggedUserStatus: REQUEST_STATUS.IDLE,
  loggedUserError: null,

  firebaseOnAuthStateChangedStatus: REQUEST_STATUS.IDLE,
};

// Reducers
const reducers = {
  completeFirebaseOnAuthStateChangedStatus: (state) => {
    state.firebaseOnAuthStateChangedStatus = REQUEST_STATUS.SUCCEEDED;
  },
};

// Async Thunk
const asyncThunk = {
  loadUser: createAsyncThunk(`${USER_SLICE_NAME}/loadUser`, async (user) => await usersService.loadUser(user)),
};

// Extra Reducers
const extraReducers = (builder) => {
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
      state.loggedUserError = t(`error-message.logged-user.${action.error.code}`);
    })
  ;
};

// Selectors
const selectors = {
  selectLoggedUser: state => {
    return state.users.loggedUser;
  },
  isLoggedIn: state => {
    return !!state.users.loggedUser;
  },
  isLoginVerificationComplete: (state) => {
    return state.users.loggedUser != null || state.users.loggedUserStatus == REQUEST_STATUS.SUCCEEDED || state.users.loggedUserStatus == REQUEST_STATUS.FAILED;
  },
  isFirebaseOnAuthStateChangedStatusComplete: (state) => {
    return state.users.firebaseOnAuthStateChangedStatus != REQUEST_STATUS.IDLE;
  },
};

export const LoggedUser = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
