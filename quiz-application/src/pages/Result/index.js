import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { getAnswersById } from '../../services/answers';
import './style.css'
const Result = () => {
  const { id } = useParams();
  const location = useLocation();
  const [answers, setAnswers] = useState([]);
  const [answersId, setAnswersId] = useState(null);
  const navigation = useNavigate();
  const { questions, answerWrong, answerCorrect, titleQuestion, numericId } = location.state;
  console.log(numericId);
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await getAnswersById(id);
        if (!response) {
          throw new Error('No answers available');
        } else {
          // Tìm đối tượng `answers` dựa trên `id` từ URL
          const userAnswersData = response.find(item => item.id === parseInt(id));
          setAnswers(userAnswersData.answers)
          setAnswersId(response[0].id);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAnswers();
  }, [id]);
  console.log(answersId);

  const percentCorrect = (answerCorrect / questions.length) * 100

  const handleBack = () => {
    navigation(`/quiz/${numericId}`, { state: { answersId } });
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