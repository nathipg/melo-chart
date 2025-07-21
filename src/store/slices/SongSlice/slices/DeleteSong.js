import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import i18n from '@/i18n';
import { songsService } from '@/services';

import { SONG_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  deleteSongStatus: REQUEST_STATUS.IDLE,
  deleteSongError: null,
};

// Async Thunk
const asyncThunk = {
  deleteSong: createAsyncThunk(`${SONG_SLICE_NAME}/deleteSong`, async (data) => await songsService.deleteSong(data)),
};

// Reducers
const reducers = {
  clearDeleteSongError: (state) => {
    state.deleteSongError = null;
  },
  clearDeleteSongStatus: (state) => {
    state.deleteSongStatus = REQUEST_STATUS.IDLE;
  },
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.deleteSong.pending, (state) => {
      state.deleteSongStatus = REQUEST_STATUS.LOADING;
      state.deleteSongError = null;
    })
    .addCase(asyncThunk.deleteSong.fulfilled, (state, action) => {
      state.deleteSongStatus = REQUEST_STATUS.SUCCEEDED;
        
      const songIndex = state.songs.findIndex(song => song.id == action.payload.id);
      state.songs.splice(songIndex, 1);
    })
    .addCase(asyncThunk.deleteSong.rejected, (state, action) => {
      state.deleteSongStatus = REQUEST_STATUS.FAILED;
      state.deleteSongError = t(`error-message.delete-song.${action.error.code}`);
    })
  ;
};

// Selectors
const selectors = {
  selectDeleteSongError: (state) => {
    return state.songs.deleteSongError;
  },
};

export const DeleteSong = {
  asyncThunk,
  extraReducers,
  initialState,
  reducers,
  selectors,
};
