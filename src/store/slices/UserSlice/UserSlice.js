import { buildSlice } from '../functions';

import { USER_SLICE_NAME } from './constants';
import * as sliceParts from './slices';

export const UserSlice = buildSlice({
  sliceName: USER_SLICE_NAME,
  sliceParts,
});
