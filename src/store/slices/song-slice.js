import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../constants';
import { songsService } from '../../services';

const SLICE_NAME = 'songs';

const getErrorMessage = (message) => {
  return `Something went wrong ${message}`;
};

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
  reducers: {},
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
      .addCase(fetchSongs.rejected, (state) => {
        state.songsStatus = REQUEST_STATUS.FAILED;
        state.songsError = getErrorMessage('loading songs');
      })
      // addSong
      .addCase(addSong.pending, (state) => {
        state.addSongStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(addSong.fulfilled, (state, action) => {
        state.addSongStatus = REQUEST_STATUS.SUCCEEDED;
        state.songs.push(action.payload);
      })
      .addCase(addSong.rejected, (state) => {
        state.addSongStatus = REQUEST_STATUS.FAILED;
        state.addSongError = getErrorMessage('adding song');
      })
      // saveSong
      .addCase(saveSong.pending, (state) => {
        state.saveSongStatus = REQUEST_STATUS.LOADING;
        console.log(1);
      })
      .addCase(saveSong.fulfilled, (state, action) => {
        state.saveSongStatus = REQUEST_STATUS.SUCCEEDED;

        const updatedSong = action.payload;

        const existingSong = state.songs.find(song => song.id === updatedSong.id);
        existingSong.frets = updatedSong.frets;
        console.log(2);
      })
      .addCase(saveSong.rejected, (state) => {
        state.saveSongStatus = REQUEST_STATUS.FAILED;
        state.saveSongError = getErrorMessage('saving song');
        console.log(3);
      })
    ;
  },
});

export default songsSlice.reducer;

// const { addSong } = songsSlice.actions;

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
  fetchSongs,
  saveSong,
  selectAllSongs,
  selectSongById,
  selectSongsError,
  selectSongsStatus,
  selectAddSongError,
  selectAddSongStatus,
  selectSaveSongStatus,
  selectSaveSongError,
};
