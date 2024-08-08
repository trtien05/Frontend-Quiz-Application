import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { getAnswers } from '../../services/answers';
import './style.css'
const Result = () => {
  const { id } = useParams();
  const location = useLocation();
  const [answers, setAnswers] = useState([]);
  const { questions, answerWrong, answerCorrect, titleQuestion } = location.state;

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await getAnswers(id);
        if (!response) {
          throw new Error('No answers available');
        } else {
          // Tìm đối tượng `answers` dựa trên `id` từ URL
          const userAnswersData = response.find(item => item.id === parseInt(id));
          setAnswers(userAnswersData.answers)

        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAnswers();
  }, [id]);

  const percentCorrect = (answerCorrect / questions.length) * 100


  return (
    <>
      <h2>Kết quả chủ đề: {titleQuestion}</h2>
      <div className='description'>
        Đúng: <span>{answerCorrect}</span>  | Sai: <span>{answerWrong}</span>  | Tổng số câu : <span>{questions.length}</span>  | Tỷ lệ đúng : <span>{percentCorrect}%</span>
      </div>
      <div className='result__list'>
        {questions.map((question, index) => {
          const userAnswer = answers.find(answer => answer.questionId === question.id)?.answer;
          console.log(userAnswer)
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
                  const isAnswerSelected = userAnswer !== null;

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
      </div>
    </>
  )
}

export default Result