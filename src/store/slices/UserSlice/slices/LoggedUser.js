import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import { usersService } from '@/services';

import { USER_SLICE_NAME } from '../constants';

// Initial State
const initialState = {
  loggedUser: null,
  publicUsers: null,

  loggedUserStatus: REQUEST_STATUS.IDLE,
  publicUsersStatus: REQUEST_STATUS.IDLE,
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
  loadPublicUsers: createAsyncThunk(`${USER_SLICE_NAME}/loadPublicUsers`, async () => await usersService.loadPublicUsers()),
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
    .addCase(asyncThunk.loadUser.rejected, (state) => {
      state.loggedUserStatus = REQUEST_STATUS.FAILED;
    })
  ;

  builder
    .addCase(asyncThunk.loadPublicUsers.pending, (state) => {
      state.publicUsersStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadPublicUsers.fulfilled, (state, action) => {
      state.publicUsersStatus = REQUEST_STATUS.SUCCEEDED;
      state.publicUsers = action.payload;
    })
    .addCase(asyncThunk.loadPublicUsers.rejected, (state) => {
      state.publicUsersStatus = REQUEST_STATUS.FAILED;
    })
  ;
};

// Selectors
const selectors = {
  selectLoggedUser: state => {
    return state.users.loggedUser;
  },
  selectPublicUsers: state => {
    return state.users.publicUsers;
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
