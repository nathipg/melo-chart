import { doc, setDoc, getFirestore, getDoc, collection, getDocs } from 'firebase/firestore';
import { v7 as uuid } from 'uuid';

import { firebaseService } from '@/services';

import { app } from './firebase-app';

const db = getFirestore(app);

export const addUser = async (data) => {
  const { email, password, username } = data;

  const { uid } = await firebaseService.auth.signUp(email, password);

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

export const signInUser = async (userData) => {
  const { email, password } = userData;

  const loginInfo = await firebaseService.auth.signIn(email, password);

  return await loadUser(loginInfo.uid);
};
