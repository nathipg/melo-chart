import { onAuthStateChanged } from 'firebase/auth';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Router } from './Router';
import { firebaseService } from './services';
import { songsSliceActions, usersSliceActions, usersSliceSelectors } from './store/slices';

import './global.scss';

const App = () => {
  const dispatch = useDispatch();

  const loggedUser = useSelector(usersSliceSelectors.selectLoggedUser);

  useEffect(() => {
    if(loggedUser) {
      dispatch(songsSliceActions.loadSongs(loggedUser.songs));
    }
  }, [ dispatch, loggedUser ]);

  useEffect(() => {
    onAuthStateChanged(firebaseService.auth.auth, (user) => {
      if (user) {
        dispatch(usersSliceActions.loadUser(user));
      }

      dispatch(usersSliceActions.completeFirebaseOnAuthStateChangedStatus());
    });
  }, [ dispatch ]);

  return (
    <>
      <Router />
    </>
  );
};

const AppMemo = memo(App);

export { AppMemo as App };
