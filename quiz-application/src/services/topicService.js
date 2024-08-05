import { get } from "../utils/request"

export const getTopicList = async () => {
  const response = await get('/topics');
  return response
}

export const getTopic = async (id) => {
  const response = await get(`/topics/${id}`);
  return response
}
