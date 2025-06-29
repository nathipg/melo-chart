import { createAsyncThunk } from '@reduxjs/toolkit';

import { songsService } from '../../../../services';
import { SONG_SLICE_NAME } from '../constants';

export const deleteSong = createAsyncThunk(`${SONG_SLICE_NAME}/deleteSong`, async (id) => await songsService.deleteSong(id));
