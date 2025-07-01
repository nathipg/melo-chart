import { createSlice } from '@reduxjs/toolkit';

import { USER_SLICE_NAME } from './constants';
import { SignUpUser, SignInUser, SignOutUser, LoggedUser } from './slices';

const initialState = {
  ...LoggedUser.initialState,
  ...SignUpUser.initialState,
  ...SignInUser.initialState,
  ...SignOutUser.initialState,
};

const usersSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    ...SignInUser.reducers,
    ...SignOutUser.reducers,
  },
  extraReducers(builder) {
    SignUpUser.extraReducers.addSignUpUserCases(builder);
    SignInUser.extraReducers.addSignInUserCases(builder);
    LoggedUser.extraReducers.addLoggedUserCases(builder);
    SignOutUser.extraReducers(builder);
  },
});

export default usersSlice.reducer;

export const usersSliceActions = {
  ...usersSlice.actions,
  ...SignUpUser.asyncThunk,
  ...SignInUser.asyncThunk,
  ...LoggedUser.asyncThunk,
  ...SignOutUser.asyncThunk,
};

export const usersSliceSelectors = {
  ...SignInUser.selectors,
  ...LoggedUser.selectors,
};
