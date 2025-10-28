import { firebaseService } from './firebase';

export const addSong = async (song) => {
  return await firebaseService.song.addSong(song);
};

export const deleteSong = async (id) => {
  return await firebaseService.song.deleteSong(id);
};

export const loadSongs = async (uid) => {
  return await firebaseService.song.loadSongs(uid);
};

export const saveSong = async (song) => {
  return await firebaseService.song.saveSong(song);
};
