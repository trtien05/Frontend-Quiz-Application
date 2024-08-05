import { get } from "../utils/request"

export const getAnswersList = async () => {
  const response = await get('/answers');
  return response
}

export const getAnswers = async (id) => {
  const response = await get(`/answers/${id}`);
  return response
}
