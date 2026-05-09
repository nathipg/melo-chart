import { buildSlice } from '@/store/slices/functions';

import { GROWL_SLICE_NAME } from './constants';
import * as sliceParts from './slices';

export const GrowlSlice = buildSlice({
  sliceName: GROWL_SLICE_NAME,
  sliceParts,
});

