import { doc, setDoc, getFirestore, deleteDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';

import { app } from './firebase-app';

const db = getFirestore(app);

export const addSong = async (song) => {
  await setDoc(
    doc(db, 'songs', song.id),
    song,
  );

  return song;
};

export const deleteSong = async (id) => {
  await deleteDoc(doc(db, 'songs', id));

  return { id };
};

export const loadSongs = async (uid) => {
  const songsRef = collection(db, 'songs');
  const q = query(
    songsRef,
    where('editors', 'array-contains', uid),
    orderBy('title', 'asc'),
  );

  const querySnapshots = await getDocs(q);

  return querySnapshots.docs.map(doc => doc.data());
};

export const saveSong = async (song) => {
  await setDoc(
    doc(db, 'songs', song.id),
    song,
  );

  return song;
};
