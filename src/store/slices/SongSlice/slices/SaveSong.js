import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../../constants';
import i18n from '../../../../i18n';
import { songsService } from '../../../../services';
import { SONG_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  saveSongStatus: REQUEST_STATUS.IDLE,
  saveSongError: null,
};

// Async Thunk
const asyncThunk = {
  saveSong: createAsyncThunk(`${SONG_SLICE_NAME}/saveSong`, async (song) => await songsService.updateSong(song)),
};

// Reducers
const reducers = {
  clearSaveSongError: (state) => {
    state.saveSongError = null;
  },
  clearSaveSongStatus: (state) => {
    state.saveSongStatus = REQUEST_STATUS.IDLE;
  },
};

// Extra Reducers
const extraReducers = {
  addSaveSongCases: (builder) => {
    builder
      .addCase(asyncThunk.saveSong.pending, (state) => {
        state.saveSongStatus = REQUEST_STATUS.LOADING;
        state.saveSongError = null;
      })
      .addCase(asyncThunk.saveSong.fulfilled, (state, action) => {
        state.saveSongStatus = REQUEST_STATUS.SUCCEEDED;

        const updatedSong = action.payload;

        const existingSong = state.songs.find(song => song.id === updatedSong.id);
        existingSong.notes = updatedSong.notes;
        existingSong.isNewSong = false;
      })
      .addCase(asyncThunk.saveSong.rejected, (state, action) => {
        state.saveSongStatus = REQUEST_STATUS.FAILED;
        state.saveSongError = t(`error-message.save-song.${action.error.message}`);
      })
    ;
  },
};

// Selectors
const selectors = {
  selectSaveSongError: (state) => {
    return state.songs.saveSongError;
  },
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
