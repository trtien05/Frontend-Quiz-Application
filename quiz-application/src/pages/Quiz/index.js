import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestionTopicId } from '../../services/questionService';
import './style.css';
import { getCookie } from '../../helper/cookie';
import { createAnswers } from '../../services/answers';

const Quiz = () => {
  const { id } = useParams();
  const numericId = parseInt(id, 10);
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

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await getQuestionTopicId(id);
        if (!response) {
          throw new Error('No questions available');
        } else {
          setQuestions(response);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchQuestion();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const answers =
    {
      id: Date.now(),
      userId: getCookie('id'),
      topicId: id
    }



    // Handle answers
    const answerList = questions.map((question, index) => {
      const value = formData.get(`answer${index + 1}`);

      return {
        questionId: question.id,
        answer: value
      };
    });

    //Add answers
    const updatedAnswers = {
      ...answers,
      answers: answerList
    }
    console.log(updatedAnswers)
    try {
      const response = await createAnswers(updatedAnswers);
      if (!response) {
        alert('That bai')
      } else {
        alert('Thanh cong')
        navigate(`/result/${id}`)

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
