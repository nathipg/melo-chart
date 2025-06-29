import * as asyncThunk from './async-thunks';
import * as extraReducers from './extra-reducers';
import initialState from './initial-state';
import * as reducers from './reducers';
import * as selectors from './selectors';

export const SaveSong = {
  asyncThunk,
  extraReducers,
  initialState,
  reducers,
  selectors,
};
