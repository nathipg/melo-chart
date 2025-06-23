import { api } from './api';

export const addSong = async (songData) => {
  try {
    await api.post('/songs', songData);

    return true;
  } catch(e) {
    console.error(e);
    return false;
  }
};

export const getSongs = async () => {
  try {
    const { data: songList } = await api.get('/songs');

    return songList;
  } catch(e) {
    console.error(e);
    return [];
  }
};

export const updateSong = async (songData) => {
  const { id } = songData;

  try {
    await api.put(`/songs/${id}`, songData);
    
    return true;
  } catch(e) {
    console.error(e);
    return false;
  }
};
