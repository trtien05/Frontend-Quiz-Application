import { get, post } from "../utils/request"

export const getUserList = async () => {
  const response = await get('/users');
  return response
}

export const getUser = async (id) => {
  const response = await get(`/users/${id}`);
  return response
}

export const createtUser = async (options) => {
  const response = await post(`/users`, options);
  return response
}

export const login = async (account) => {
  const response = await get(`/users?email=${account.email}&password=${account.password}`);
  return response;
}