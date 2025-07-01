import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../../constants';
import i18n from '../../../../i18n';
import { songsService } from '../../../../services';
import { SONG_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  songs: [],
  songsStatus: REQUEST_STATUS.IDLE,
  songsError: null,
};

// Async Thunk
const asyncThunk = {
  fetchSongs: createAsyncThunk(`${SONG_SLICE_NAME}/fetchSongs`, async () => await songsService.getSongs()),
};

// Extra Reducers
const extraReducers = {
  addFetchSongsCases: (builder) => {
    builder
      .addCase(asyncThunk.fetchSongs.pending, (state) => {
        state.songsStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(asyncThunk.fetchSongs.fulfilled, (state, action) => {
        state.songsStatus = REQUEST_STATUS.SUCCEEDED;
        state.songs = action.payload;
      })
      .addCase(asyncThunk.fetchSongs.rejected, (state, action) => {
        state.songsStatus = REQUEST_STATUS.FAILED;
        state.songsError = t(`error-message.fetch-songs.${action.error.message}`);
      })
    ;
  },
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


export const FetchSongs = {
  asyncThunk,
  extraReducers,
  initialState,
  selectors,
};
