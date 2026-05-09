import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import { songsService } from '@/services';

import { SONG_SLICE_NAME } from '../constants';

// Initial State
const initialState = {
  deleteSongStatus: REQUEST_STATUS.IDLE,
};

// Async Thunk
const asyncThunk = {
  deleteSong: createAsyncThunk(`${SONG_SLICE_NAME}/deleteSong`, async (data) => await songsService.deleteSong(data)),
};

// Reducers
const reducers = {
  clearDeleteSongStatus: (state) => {
    state.deleteSongStatus = REQUEST_STATUS.IDLE;
  },
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.deleteSong.pending, (state) => {
      state.deleteSongStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.deleteSong.fulfilled, (state, action) => {
      state.deleteSongStatus = REQUEST_STATUS.SUCCEEDED;
        
      const songIndex = state.songs.findIndex(song => song.id == action.payload.id);
      state.songs.splice(songIndex, 1);
    })
    .addCase(asyncThunk.deleteSong.rejected, (state) => {
      state.deleteSongStatus = REQUEST_STATUS.FAILED;
    })
  ;
};

// Selectors
const selectors = {
};

export const DeleteSong = {
  asyncThunk,
  extraReducers,
  initialState,
  reducers,
  selectors,
};
