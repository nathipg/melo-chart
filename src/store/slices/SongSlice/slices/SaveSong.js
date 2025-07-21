import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import i18n from '@/i18n';
import { songsService } from '@/services';
import { alphabeticallySortSongs } from '@/utils';

import { SONG_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  saveSongStatus: REQUEST_STATUS.IDLE,
  saveSongError: null,
  saveSongMessage: null,
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
  clearSaveSongError: (state) => {
    state.saveSongError = null;
  },
  clearSaveSongStatus: (state) => {
    state.saveSongStatus = REQUEST_STATUS.IDLE;
    state.saveSongMessage = null;
  },
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.saveSong.pending, (state) => {
      state.saveSongStatus = REQUEST_STATUS.LOADING;
      state.saveSongError = null;
    })
    .addCase(asyncThunk.saveSong.fulfilled, (state, action) => {
      state.saveSongStatus = REQUEST_STATUS.SUCCEEDED;
      state.saveSongMessage = t('Song saved');

      const updatedSong = action.payload;

      const existingSong = state.songs.find(song => song.id === updatedSong.id);
      existingSong.notes = updatedSong.notes;

      state.songs = alphabeticallySortSongs(state.songs);
    })
    .addCase(asyncThunk.saveSong.rejected, (state, action) => {
      state.saveSongStatus = REQUEST_STATUS.FAILED;
      state.saveSongError = t(`error-message.save-song.${action.error.code}`);
    })
  ;
};

// Selectors
const selectors = {
  selectSaveSongError: (state) => {
    return state.songs.saveSongError;
  },
  selectSaveSongStatus: (state) => {
    return state.songs.saveSongStatus;
  },
  selectSaveSongMessage: (state) => {
    return state.songs.saveSongMessage;
  },
};

export const SaveSong = {
  asyncThunk,
  extraReducers,
  initialState,
  reducers,
  selectors,
};
