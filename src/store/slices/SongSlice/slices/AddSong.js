import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import { songsService } from '@/services';

import { SONG_SLICE_NAME } from '../constants';

// Initial State
const initialState = {
  addSongStatus: REQUEST_STATUS.IDLE,
  latestAddedSongId: null,
};

// Async Thunk
const asyncThunk = {
  addSong: createAsyncThunk(`${SONG_SLICE_NAME}/addSong`, async (data) => await songsService.addSong(data)),
};

// Reducers
const reducers = {
  clearAddSongStatus: (state) => {
    state.addSongStatus = REQUEST_STATUS.IDLE;
  },
  clearLatestAddedSongId: (state) => {
    state.latestAddedSongId = null;
  },
};

// Extra reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.addSong.pending, (state) => {
      state.addSongStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.addSong.fulfilled, (state, action) => {
      state.addSongStatus = REQUEST_STATUS.SUCCEEDED;
      state.songs.push(action.payload);
      state.latestAddedSongId = action.payload.id;
    })
    .addCase(asyncThunk.addSong.rejected, (state) => {
      state.addSongStatus = REQUEST_STATUS.FAILED;
    })
  ;
};

// Selectors
const selectors = {
  selectAddSongStatus: (state) => {
    return state.songs.addSongStatus;
  },
  selectLatestAddedSongId: (state) => {
    return state.songs.latestAddedSongId;
  },
};

export const AddSong = {
  asyncThunk,
  extraReducers,
  initialState,
  reducers,
  selectors,
};
