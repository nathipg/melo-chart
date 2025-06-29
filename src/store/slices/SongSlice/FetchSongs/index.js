import * as asyncThunk from './async-thunks';
import * as extraReducers from './extra-reducers';
import initialState from './initial-state';
import * as selectors from './selectors';

export const FetchSongs = {
  asyncThunk,
  extraReducers,
  initialState,
  selectors,
};
