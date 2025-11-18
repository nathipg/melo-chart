import { doc, setDoc, getFirestore, deleteDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';

import { app } from './firebase-app';

import { firebaseService } from '.';

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
    orderBy('owner', 'asc'),
    orderBy('title', 'asc'),
  );

  const querySnapshots = await getDocs(q);

  const songs = querySnapshots.docs.map(doc => doc.data());

  const ownersIds = songs.reduce((acc, song) => {
    return [
      ...acc,
      ...song.editors,
      song.owner,
    ];
  }, []);

  const users = await firebaseService.user.getUsersInUIDListAsMap(ownersIds);

  const songsWithUsersData = songs.map(song => {
    const ownerData = users[song.owner] || {};
    const editorsData = song.editors.map(editor => {
      const editorData = users[editor] || null;

      return {
        value: editor,
        label: `${editorData?.username}#${editorData?.tag}`,
      };
    });

    return {
      ...song,
      editorsData,
      ownerData,
    };
  });

  return songsWithUsersData;
};

export const saveSong = async (song) => {
  const { editorsData: _, ...otherSongData } = song;

  await setDoc(
    doc(db, 'songs', song.id),
    otherSongData,
  );

  return song;
};
