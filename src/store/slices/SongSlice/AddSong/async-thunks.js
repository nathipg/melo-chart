import { createAsyncThunk } from '@reduxjs/toolkit';

import { songsService } from '../../../../services';
import { SONG_SLICE_NAME } from '../constants';

export const addSong = createAsyncThunk(`${SONG_SLICE_NAME}/addSong`, async (song) => await songsService.addSong(song));
