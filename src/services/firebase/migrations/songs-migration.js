import { firebaseService } from '..';

const migrateSongsFromUser = async (uid) => {
  const user = await firebaseService.user.loadUser(uid);

  user.songs.map(song => {
    firebaseService.song.addSong({
      ...song,
      editors: [ uid ],
    });
  });
};

export const songsMigration = async () => {
  const block = true;
  
  if(block) {
    return;
  }

  const users = await firebaseService.user.getAllUsers();

  users.forEach(async (user) => {
    migrateSongsFromUser(user.uid);

    // Validate data
    const songs = await firebaseService.song.loadSongs(user.uid);

    console.log(user.uid, user.email, songs.length);
  });
};
