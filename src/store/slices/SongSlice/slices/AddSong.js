import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import i18n from '@/i18n';
import { songsService } from '@/services';

import { SONG_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  addSongStatus: REQUEST_STATUS.IDLE,
  addSongError: null,
  latestAddedSongId: null,
};

// Async Thunk
const asyncThunk = {
  addSong: createAsyncThunk(`${SONG_SLICE_NAME}/addSong`, async (data) => await songsService.addSong(data)),
};

// Reducers
const reducers = {
  clearAddSongError: (state) => {
    state.addSongError = null;
  },
  clearAddSongStatus: (state) => {
    state.addSongStatus = REQUEST_STATUS.IDLE;
  },
  setAddSongError: (state, action) => {
    state.addSongError = action.payload;
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
      state.addSongError = null;
    })
    .addCase(asyncThunk.addSong.fulfilled, (state, action) => {
      state.addSongStatus = REQUEST_STATUS.SUCCEEDED;
      state.songs.push(action.payload);
      state.latestAddedSongId = action.payload.id;
    })
    .addCase(asyncThunk.addSong.rejected, (state, action) => {
      state.addSongStatus = REQUEST_STATUS.FAILED;
      state.addSongError = t(`error-message.add-song.${action.error.code}`);
    })
  ;
};

// Selectors
const selectors = {
  selectAddSongError: (state) => {
    return state.songs.addSongError;
  },
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
