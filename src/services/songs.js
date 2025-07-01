import { firebaseService } from './firebase';

export const addSong = async (data) => {
  return await firebaseService.user.addSong(data);
};

export const deleteSong = async (data) => {
  return await firebaseService.user.deleteSong(data);
};

export const saveSong = async (data) => {
  return await firebaseService.user.saveSong(data);
};
