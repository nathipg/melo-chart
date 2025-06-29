import { createAsyncThunk } from '@reduxjs/toolkit';

import { songsService } from '../../../../services';
import { SONG_SLICE_NAME } from '../constants';

export const fetchSongs = createAsyncThunk(`${SONG_SLICE_NAME}/fetchSongs`, async () => await songsService.getSongs());
