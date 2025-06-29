import { createSlice } from '@reduxjs/toolkit';

import { AddSong } from './AddSong';
import { SONG_SLICE_NAME } from './constants';
import { DeleteSong } from './DeleteSong';
import { FetchSongs } from './FetchSongs';
import { SaveSong } from './SaveSong';

const initialState = {
  ...FetchSongs.initialState,
  ...AddSong.initialState,
  ...SaveSong.initialState,
  ...DeleteSong.initialState,
};

const songsSlice = createSlice({
  name: SONG_SLICE_NAME,
  initialState,
  reducers: {
    ...AddSong.reducers,
    ...SaveSong.reducers,
    ...DeleteSong.reducers,
  },
  extraReducers(builder) {
    FetchSongs.extraReducers.addFetchSongsCases(builder);
    AddSong.extraReducers.addAddSongCases(builder);
    SaveSong.extraReducers.addSaveSongCases(builder);
    DeleteSong.extraReducers.addDeleteSongCases(builder);
  },
});

export default songsSlice.reducer;

export const songsSliceActions = {
  ...songsSlice.actions,
  ...FetchSongs.asyncThunk,
  ...AddSong.asyncThunk,
  ...SaveSong.asyncThunk,
  ...DeleteSong.asyncThunk,
};

export const songsSliceSelectors = {
  ...FetchSongs.selectors,
  ...AddSong.selectors,
  ...SaveSong.selectors,
  ...DeleteSong.selectors,
};
