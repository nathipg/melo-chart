import { createSlice } from '@reduxjs/toolkit';

import { SONG_SLICE_NAME } from './constants';
import { AddSong, DeleteSong, LoadSongs, SaveSong } from './slices';

const initialState = {
  ...LoadSongs.initialState,
  ...AddSong.initialState,
  ...SaveSong.initialState,
  ...DeleteSong.initialState,
};

const songsSlice = createSlice({
  name: SONG_SLICE_NAME,
  initialState,
  reducers: {
    ...AddSong.reducers,
    ...DeleteSong.reducers,
    ...LoadSongs.reducers,
    ...SaveSong.reducers,
  },
  extraReducers(builder) {
    AddSong.extraReducers.addAddSongCases(builder);
    SaveSong.extraReducers.addSaveSongCases(builder);
    DeleteSong.extraReducers.addDeleteSongCases(builder);
  },
});

export default songsSlice.reducer;

export const songsSliceActions = {
  ...songsSlice.actions,
  ...AddSong.asyncThunk,
  ...SaveSong.asyncThunk,
  ...DeleteSong.asyncThunk,
};

export const songsSliceSelectors = {
  ...AddSong.selectors,
  ...DeleteSong.selectors,
  ...DeleteSong.selectors,
  ...LoadSongs.selectors,
  ...SaveSong.selectors,
};
