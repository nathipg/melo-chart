import { doc, setDoc, getFirestore, getDoc, collection, getDocs, documentId, query, where } from 'firebase/firestore';
import { v7 as uuid } from 'uuid';

import { firebaseService } from '@/services';

import { app } from './firebase-app';

const db = getFirestore(app);

export const addPublicUser = async (data) => {
  const { uid, tag, username } = data;
  await setDoc(
    doc(db, 'publicUsers', uid),
    {
      uid,
      tag,
      username,
    },
  );
};

export const addUser = async (data) => {
  const { email, password, username } = data;

  const { uid } = await firebaseService.auth.signUp(email, password);

  const tag = uuid();

  await setDoc(
    doc(db, 'users', uid),
    {
      uid,
      tag,
      username,
      email,
    },
  );

  await addPublicUser({
    uid,
    tag,
    username,
  });
};

export const getAllPublicUsers = async () => {
  const usersRef = collection(db, 'publicUsers');
  const usersSnapshots = await getDocs(usersRef);

  return usersSnapshots.docs.map(doc => doc.data());
};

export const getAllUsers = async () => {
  const usersRef = collection(db, 'users');
  const usersSnapshots = await getDocs(usersRef);

  return usersSnapshots.docs.map(doc => doc.data());
};

export const getUsersInUIDListAsMap = async (uidList) => {
  if(!uidList?.length) {
    return {};
  }

  const usersRef = collection(db, 'publicUsers');
  const q = query(
    usersRef,
    where(documentId(), 'in', uidList),
  );
  const usersSnapshots = await getDocs(q);

  return usersSnapshots.docs.reduce((acc, doc) => {
    return {
      ...acc,
      [doc.id]: doc.data(),
    };
  }, {});
};

export const loadPublicUsers = async () => {
  const collectionRef = collection(db, 'publicUsers');
  const docsSnap = await getDocs(collectionRef);

  return docsSnap.docs.map(doc => doc.data());
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
