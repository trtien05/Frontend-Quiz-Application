import { del, get, patch, post } from "../utils/request"

export const getAnswersList = async () => {
  const response = await get('/answers');
  return response
}

export const getAnswersById = async (id) => {
  const response = await get(`/answers/${id}`);
  return response
}

export const createAnswers = async (options) => {
  const response = await post(`/answers`, options);
  return response
}

export const deleteAnswers = async (id) => {
  const response = await del(`/answers/${id}`);
  return response
}

export const editAnswers = async (id, options) => {
  const response = await patch(`/answers/${id}`, options);
  return response;
}