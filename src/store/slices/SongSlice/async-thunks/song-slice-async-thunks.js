import { createAsyncThunk } from '@reduxjs/toolkit';

import { songsService } from '../../../../services';
import { SONG_SLICE_NAME } from '../constants';

export const addSong = createAsyncThunk(`${SONG_SLICE_NAME}/addSong`, async (song) => await songsService.addSong(song));
export const deleteSong = createAsyncThunk(`${SONG_SLICE_NAME}/deleteSong`, async (id) => await songsService.deleteSong(id));
export const fetchSongs = createAsyncThunk(`${SONG_SLICE_NAME}/fetchSongs`, async () => await songsService.getSongs());
export const saveSong = createAsyncThunk(`${SONG_SLICE_NAME}/saveSong`, async (song) => await songsService.updateSong(song));
