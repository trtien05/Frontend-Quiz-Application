import { get } from "../utils/request"

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