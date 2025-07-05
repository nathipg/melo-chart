import { doc, setDoc, getFirestore, getDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { v7 as uuid } from 'uuid';

import { signUp } from './auth';
import { app } from './firebase-app';

import { firebaseService } from '.';


const db = getFirestore(app);

export const addSong = async (data) => {
  const { song, loggedUser } = data;
  const { uid } = loggedUser;

  await setDoc(
    doc(db, 'users', uid, 'songs', song.id),
    song,
  );

  return song;
};

export const addUser = async (data) => {
  const { email, password, username } = data;

  const { uid } = await signUp(email, password);

  await setDoc(
    doc(db, 'users', uid),
    {
      uid,
      tag: uuid(),
      username,
      email,
    },
  );
};

export const deleteSong = async (data) => {
  const { id, loggedUser } = data;
  const { uid } = loggedUser;

  await deleteDoc(doc(db, 'users', uid, 'songs', id));

  return { id };
};

export const loadUser = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()) {
    const userData = await docSnap.data();

    const collectionRef = collection(db, 'users', uid, 'songs');
    const docsSnap = await getDocs(collectionRef);

    const normalizedSongs = docsSnap.docs.map(doc => doc.data());

    return {
      ...userData,
      songs: normalizedSongs,
    };
  }

  return null;
};

export const saveSong = async (data) => {
  const { song, loggedUser } = data;
  const { uid } = loggedUser;

  await setDoc(
    doc(db, 'users', uid, 'songs', song.id),
    song,
  );

  return song;
};

export const signInUser = async (userData) => {
  const { email, password } = userData;

  const loginInfo = await firebaseService.auth.signIn(email, password);

  return await loadUser(loginInfo.uid);
};
