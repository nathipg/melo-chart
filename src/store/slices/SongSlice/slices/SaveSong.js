import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import { songsService } from '@/services';

import { SONG_SLICE_NAME } from '../constants';

// Initial State
const initialState = {
  saveSongStatus: REQUEST_STATUS.IDLE,
};

// Async Thunk
const asyncThunk = {
  saveSong: createAsyncThunk(`${SONG_SLICE_NAME}/saveSong`, async (song) => await songsService.saveSong(song)),
};

// Reducers
const reducers = {
  editSongTitle: (state, action) => {
    const { payload: songData } = action;

    const song = state.songs.find(song => song.id === songData.id);
    song.title = songData.title;
  },
  clearSaveSongStatus: (state) => {
    state.saveSongStatus = REQUEST_STATUS.IDLE;
  },
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.saveSong.pending, (state) => {
      state.saveSongStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.saveSong.fulfilled, (state, action) => {
      state.saveSongStatus = REQUEST_STATUS.SUCCEEDED;

      const updatedSong = action.payload;

      const existingSong = state.songs.find(song => song.id === updatedSong.id);
      existingSong.notes = updatedSong.notes;
    })
    .addCase(asyncThunk.saveSong.rejected, (state) => {
      state.saveSongStatus = REQUEST_STATUS.FAILED;
    })
  ;
};

// Selectors
const selectors = {
  selectSaveSongStatus: (state) => {
    return state.songs.saveSongStatus;
  },
};

export const SaveSong = {
  asyncThunk,
  extraReducers,
  initialState,
  reducers,
  selectors,
};
