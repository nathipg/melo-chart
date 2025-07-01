import { api } from './api';

export const signInUser = async (userData) => {
  const { email, password } = userData;
  const { data: user } = await api.get(`/users?email=${email}&password=${password}`);

  return user;
};

export const signUpUser = async (userData) => {
  const { data: user } = await api.post('/users', userData);

  return user;
};
