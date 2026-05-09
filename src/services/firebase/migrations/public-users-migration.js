import { firebaseService } from '..';

export const usersToPublicUsersMigration = async () => {
  const block = true;
  
  if(block) {
    return;
  }

  const users = await firebaseService.user.getAllUsers();
  const publicUsers = await firebaseService.user.getAllPublicUsers();

  users.forEach(async (user) => {
    if(!publicUsers?.find(pu => pu.uid == user.uid)) {
      await firebaseService.user.addPublicUser(user);
    }
  });
};
