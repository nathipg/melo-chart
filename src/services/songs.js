import { api } from './api';

export const addSong = async (data) => {
  const { song: songData } = data;
  const { data: song } = await api.post('/songs', songData);

  return song;
};

export const deleteSong = async (id) => {
  await api.delete(`/songs/${id}`);
  return id;
};

export const getSongs = async () => {
  const { data: songList } = await api.get('/songs');

  return songList;
};

export const updateSong = async (songData) => {
  const { id } = songData;

  const { data: song } = await api.put(`/songs/${id}`, songData);

  return song;
};
