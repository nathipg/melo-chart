import { createAsyncThunk } from '@reduxjs/toolkit';

import { songsService } from '../../../../services';
import { SONG_SLICE_NAME } from '../constants';

export const saveSong = createAsyncThunk(`${SONG_SLICE_NAME}/saveSong`, async (song) => await songsService.updateSong(song));
