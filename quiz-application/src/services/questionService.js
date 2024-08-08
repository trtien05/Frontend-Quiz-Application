import { get } from "../utils/request"

export const getQuestionList = async () => {
  const response = await get('/questions');
  return response
}

export const getQuestionTopicId = async (id) => {
  const response = await get(`/questions?topicId=${id}`);
  return response
}
