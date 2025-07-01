import { firebaseService } from './firebase';

export const loadUser = async (userData) => {
  const { uid } = userData;
  return await firebaseService.user.loadUser(uid);
};

export const signInUser = async (userData) => {
  const { email, password } = userData;

  return await firebaseService.user.signInUser({
    email,
    password,
  });
};

export const signOut = async () => {
  await firebaseService.auth.signOut();
};

export const signUpUser = async (userData) => {
  await firebaseService.user.addUser(userData);
};
