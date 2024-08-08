import { get, post } from "../utils/request"

export const getAnswersList = async () => {
  const response = await get('/answers');
  return response
}

export const getAnswers = async (id) => {
  const response = await get(`/answers?id=${id}`);
  return response
}

export const createAnswers = async (options) => {
  const response = await post(`/answers`, options);
  return response
}