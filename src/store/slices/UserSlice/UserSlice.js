import { createSlice } from '@reduxjs/toolkit';

import { USER_SLICE_NAME } from './constants';
import { SignUpUser, SignInUser, SignOutUser } from './slices';

const initialState = {
  ...SignUpUser.initialState,
  ...SignInUser.initialState,
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
  },
});

export default usersSlice.reducer;

export const usersSliceActions = {
  ...usersSlice.actions,
  ...SignUpUser.asyncThunk,
  ...SignInUser.asyncThunk,
};

export const usersSliceSelectors = {
  ...SignInUser.selectors,
};
