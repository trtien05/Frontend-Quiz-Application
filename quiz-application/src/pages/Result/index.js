import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { deleteAnswers, getAnswersById } from '../../services/answers';
import './style.css'
import { getQuestionTopicId } from '../../services/questionService';
const Result = () => {
  const { id } = useParams();
  const [answers, setAnswers] = useState([]);
  const [answersList, setAnswersList] = useState([]);

  const [questions, setQuestions] = useState([]);

  const navigation = useNavigate();
  let titleQuestion = '';
  let answerCorrect = 0;

  const answerWrong = questions.length - answerCorrect;

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const answersResponse = await getAnswersById(id);
        if (!answersResponse) {
          throw new Error('No answers available');
        }

        const questionsResponse = await getQuestionTopicId(answersResponse.topicId)
        if (!questionsResponse) {
          throw new Error('No answers available');
        }



        setQuestions(questionsResponse)
        setAnswersList(answersResponse)
        setAnswers(answersResponse.answers)

      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAnswers();
  }, [id]);

  switch (answersList.topicId) {
    case 1:
      titleQuestion = 'HTML5';
      break;
    case 2:
      titleQuestion = 'CSS3';
      break;
    case 3:
      titleQuestion = 'Javascript';
      break;
    case 4:
      titleQuestion = 'ReactJS';
      break;
    default:
      titleQuestion = 'Unknown';
      break;
  }
  questions.forEach((question) => {
    const userAnswer = answers.find((answer) => answer.questionId === question.id)?.answer;
    if (userAnswer === question.correctAnswer) {
      answerCorrect += 1;
    }
  });
  const percentCorrect = (answerCorrect / questions.length) * 100

  const handleBack = async () => {
    try {
      const response = await deleteAnswers(id);
      if (!response) {
        throw new Error('No answers available');
      } else {
        navigation(`/quiz/${answersList.topicId}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <h2>Kết quả chủ đề: {titleQuestion}</h2>
      <div className='description'>
        Đúng: <span>{answerCorrect}</span>  | Sai: <span>{answerWrong}</span>  | Tổng số câu : <span>{questions.length}</span>  | Tỷ lệ đúng : <span>{percentCorrect}%</span>
      </div>
      <div className='result__list'>
        {questions.map((question, index) => {
          const userAnswer = answers.find(answer => answer.questionId === question.id)?.answer;
          return (
            <div key={index} className='question__item'>
              <div className='title__question'>
                <label>Câu {index + 1}: {question.question}</label>
                <span className={userAnswer === question.correctAnswer ? 'result-correct' : 'result-incorrect'}>
                  {userAnswer === question.correctAnswer ? 'Đúng' : 'Sai'}
                </span>

              </div>
              <div className='answers'>
                {question.answers.map((answer, answerIndex) => {
                  const isCorrectAnswer = answerIndex === question.correctAnswer;
                  const isUserAnswer = answerIndex === userAnswer;

                  return (
                    <Fragment key={answerIndex}>

                      <input
                        disabled={true}
                        checked={isUserAnswer}
                        type="radio"
                        name={`answer${index + 1}`}
                        id={`question${index + 1}_answer${answerIndex}`}
                      />
                      <label
                        htmlFor={`question${index + 1}_answer${answerIndex}`}

                        className={
                          isCorrectAnswer
                            ? 'correct'
                            : isUserAnswer
                              ? 'incorrect'
                              : ''
                        }
                      >
                        {answer}
                      </label>

                      <br />
                    </Fragment>
                  );

                })}
              </div>
            </div>
          );
        })}
        <button className='btn__submit' type='submit' onClick={handleBack}>Try Again</button>

      </div>

    </>
  )
}

export default Result