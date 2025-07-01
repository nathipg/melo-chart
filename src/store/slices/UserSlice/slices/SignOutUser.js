// Reducers
const reducers = {
  signOutUser: (state) => {
    state.loggedUser = null;
  },
};

export const SignOutUser = {
  reducers,
};
