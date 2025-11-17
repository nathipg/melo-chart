import * as auth from './auth';
import * as migrations from './migrations';
import * as song from './song';
import * as user from './user';

export const firebaseService = {
  auth,
  song,
  user,
  migrations,
};
