import { buildSlice } from '../functions';

import { SONG_SLICE_NAME } from './constants';
import * as sliceParts from './slices';

export const SongSlice = buildSlice({
  sliceName: SONG_SLICE_NAME,
  sliceParts,
});
