import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getQuestionTopicId } from '../../services/questionService';
import './style.css';
import { getCookie } from '../../helper/cookie';
import { createAnswers, editAnswers, getAnswersById } from '../../services/answers';

const Quiz = () => {
  const { id } = useParams();
  const numericId = parseInt(id, 10);
  const location = useLocation();
  const { answersId } = location.state;
  console.log(answersId)

  const navigate = useNavigate();
  let titleQuestion = " ";
  switch (numericId) {
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

  const [questions, setQuestions] = useState([]);
  const [answersObj, setAnswersObj] = useState([]);
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const [questionsResponse, answersResponse] = await Promise.all([
          getQuestionTopicId(id),
          getAnswersById(answersId)
        ]);
        if (!questionsResponse) {
          throw new Error('No questions available');
        }
        if (!answersResponse) {
          throw new Error('No answers available');
        }

        setAnswersObj(answersResponse)
        setQuestions(questionsResponse);

      } catch (error) {
        console.log(error.message);
      }
    };
    fetchQuestion();
  }, [id]);
  console.log(answersObj);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let answers = null;
    if (answersObj.length > 0) {
      answers = {
        id: answersId.toString(),
        userId: getCookie('id'),
        topicId: id
      }
    } else {
      answers = {
        id: Date.now().toString(),
        userId: getCookie('id'),
        topicId: id
      }
    }

    let answerCorrect = 0;

    // Handle answers
    const answerList = questions.map((question, index) => {
      const value = formData.get(`answer${index + 1}`);
      const numericValue = parseInt(value, 10);
      if (numericValue === question.correctAnswer) {
        answerCorrect += 1;
      }
      return {
        questionId: question.id,
        answer: numericValue
      };
    });
    const answerWrong = questions.length - answerCorrect;

    //Add answers
    const updatedAnswers = {
      ...answers,
      answers: answerList
    }

    try {
      let response = ''
      if (answersObj.length > 0) {
        console.log('cap nhat do nha')
        response = await editAnswers(updatedAnswers);
      } else {
        response = await createAnswers(updatedAnswers);
      }
      if (!response) {
        alert('That bai')
      } else {
        alert('Thanh cong')
        navigate(`/result/${response.id}`, { state: { questions, answerWrong, answerCorrect, titleQuestion, numericId } })

      }
    } catch (error) {
      console.log(error.message)
    }

  };

  return (
    <>
      <h2>Quiz topic: {titleQuestion}</h2>
      <div className='questions__list'>
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} className='question__item'>
              <div className='title__question'>
                <label>Câu {index + 1}: {question.question}</label>
              </div>
              <div className='answers'>
                {question.answers.map((answer, answerIndex) => (
                  <Fragment key={answerIndex}>
                    <input
                      required
                      type="radio"
                      name={`answer${index + 1}`}
                      id={`question${index + 1}_answer${answerIndex}`}
                      value={answerIndex}
                    />
                    <label htmlFor={`question${index + 1}_answer${answerIndex}`}>{answer}</label>
                    <br />
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
          <button className='btn__submit' type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Quiz;
