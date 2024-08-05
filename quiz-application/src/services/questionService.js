import { get } from "../utils/request"

export const getQuestionList = async () => {
  const response = await get('/questions');
  return response
}

export const getQuestion = async (id) => {
  const response = await get(`/questions/${id}`);
  return response
}
