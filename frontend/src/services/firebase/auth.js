import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';

import { app } from './firebase-app';

export const auth = getAuth(app);

export const signIn = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  return user;
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};

export const signUp = async (email, password) => {
  const { user } = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return user;
};
