import * as auth from './auth';
import * as song from './song';
import * as songsMigration from './songs-migration';
import * as user from './user';

export const firebaseService = {
  auth,
  song,
  user,
  songsMigration,
};
