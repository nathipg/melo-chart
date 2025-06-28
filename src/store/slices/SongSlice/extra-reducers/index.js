import { addAddSongCases } from './add-song-extra-reducers.functions';
import { addFetchSongsCases } from './fetch-songs-extra-reducers.functions';
import { addSaveSongCases } from './save-song-extra-reducers.functions';

const addAllCases = (builder) => {
  addAddSongCases(builder);
  addFetchSongsCases(builder);
  addSaveSongCases(builder);
};

export const songSliceExtraReducers = { addAllCases };
