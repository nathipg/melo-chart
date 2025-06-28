import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../constants';
import { songsService } from '../../services';

const SLICE_NAME = 'songs';

const initialState = {
  songs: [],
  songsStatus: REQUEST_STATUS.IDLE,
  songsError: null,

  addSongStatus: REQUEST_STATUS.IDLE,
  addSongError: null,

  saveSongStatus: REQUEST_STATUS.IDLE,
  saveSongError: null,
};

const fetchSongs = createAsyncThunk(`${SLICE_NAME}/fetchSongs`, async () => await songsService.getSongs());
const addSong = createAsyncThunk(`${SLICE_NAME}/addSong`, async (song) => await songsService.addSong(song));
const saveSong = createAsyncThunk(`${SLICE_NAME}/saveSong`, async (song) => await songsService.updateSong(song));

const songsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    // Add song
    setAddSongError(state, action) {
      state.addSongError = action.payload;
    },
    clearAddSongError(state) {
      state.addSongError = null;
    },
    clearAddSongStatus(state) {
      state.addSongStatus = REQUEST_STATUS.IDLE;
    },

    // Save song
    clearSaveSongError(state) {
      state.saveSongError = null;
    },
    clearSaveSongStatus(state) {
      state.saveSongStatus = REQUEST_STATUS.IDLE;
    },
  },
  extraReducers(builder) {
    builder
      // fetchSongs
      .addCase(fetchSongs.pending, (state) => {
        state.songsStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.songsStatus = REQUEST_STATUS.SUCCEEDED;
        state.songs = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.songsStatus = REQUEST_STATUS.FAILED;
        state.songsError = action.error.message;
      })
      // addSong
      .addCase(addSong.pending, (state) => {
        state.addSongStatus = REQUEST_STATUS.LOADING;
        state.addSongError = null;
      })
      .addCase(addSong.fulfilled, (state, action) => {
        state.addSongStatus = REQUEST_STATUS.SUCCEEDED;
        state.songs.push(action.payload);
      })
      .addCase(addSong.rejected, (state, action) => {
        state.addSongStatus = REQUEST_STATUS.FAILED;
        state.addSongError = action.error.message;
      })
      // saveSong
      .addCase(saveSong.pending, (state) => {
        state.saveSongStatus = REQUEST_STATUS.LOADING;
        state.saveSongError = null;
      })
      .addCase(saveSong.fulfilled, (state, action) => {
        state.saveSongStatus = REQUEST_STATUS.SUCCEEDED;

        const updatedSong = action.payload;

        const existingSong = state.songs.find(song => song.id === updatedSong.id);
        existingSong.frets = updatedSong.frets;
      })
      .addCase(saveSong.rejected, (state, action) => {
        state.saveSongStatus = REQUEST_STATUS.FAILED;
        state.saveSongError = action.error.message;
      })
    ;
  },
});

export default songsSlice.reducer;

const {
  clearAddSongError,
  clearAddSongStatus,
  setAddSongError,
  clearSaveSongError,
  clearSaveSongStatus,
} = songsSlice.actions;

const selectAllSongs = state => state.songs.songs;
const selectSongById = songId => state => state.songs.songs.find(song => song.id === songId);
const selectSongsError = state => state.songs.songsError;
const selectSongsStatus = state => state.songs.songsStatus;

const selectAddSongError = state => state.songs.addSongError;
const selectAddSongStatus = state => state.songs.addSongStatus;

const selectSaveSongError = state => state.songs.saveSongError;
const selectSaveSongStatus = state => state.songs.saveSongStatus;

export const songsSliceFns = {
  addSong,
  clearAddSongError,
  clearAddSongStatus,
  fetchSongs,
  saveSong,
  selectAddSongError,
  selectAddSongStatus,
  selectAllSongs,
  selectSaveSongError,
  selectSaveSongStatus,
  selectSongById,
  selectSongsError,
  selectSongsStatus,
  setAddSongError,
  clearSaveSongError,
  clearSaveSongStatus,
};
