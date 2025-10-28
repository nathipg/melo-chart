import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import { songsService } from '@/services';

import { SONG_SLICE_NAME } from '../constants';

// Initial State
const initialState = {
  songs: [],
  loadSongsStatus: REQUEST_STATUS.IDLE,
};

// Async Thunk
const asyncThunk = {
  loadSongs: createAsyncThunk(`${SONG_SLICE_NAME}/loadSongs`, async (uid) => await songsService.loadSongs(uid)),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.loadSongs.pending, (state) => {
      state.loadSongsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadSongs.fulfilled, (state, action) => {
      state.loadSongsStatus = REQUEST_STATUS.SUCCEEDED;
      state.songs = action.payload;
    })
    .addCase(asyncThunk.loadSongs.rejected, (state) => {
      state.loadSongsStatus = REQUEST_STATUS.FAILED;
    })
  ;
};

// Selectors
const selectors = {
  selectAllSongs: (state) => {
    return state.songs.songs;
  },
  selectSongById: (songId) => (state) => {
    return state.songs.songs.find(song => song.id === songId);
  },
  selectSongsError: (state) => {
    return state.songs.songsError;
  },
  selectSongsStatus: (state) => {
    return state.songs.songsStatus;
  },
};

export const LoadSongs = {
  initialState,
  asyncThunk,
  extraReducers,
  selectors,
};
