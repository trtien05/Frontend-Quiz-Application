import React, { useEffect, useState } from 'react'
import { getAnswersList } from './../../services/answers';
import './style.css'
const Answers = () => {
  const [answers, setAnswers] = useState([]);
  let topicTitle = '';
  useEffect(() => {
    const fetchanswers = async () => {
      try {
        const response = await getAnswersList();
        if (!response) {
          throw new Error('Khong co answers')
        } else {
          setAnswers(response)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchanswers();
  }, [])


  return (
    <>
      <h2>Danh sach bai da luyen tap</h2>
      <div>
        <table className='table__answers'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên chủ đề</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((item, id) => {
              switch (item.topicId) {
                case 1:
                  topicTitle = 'HTML5';
                  break;
                case 2:
                  topicTitle = 'CSS3';
                  break;
                case 3:
                  topicTitle = 'Javascript';
                  break;
                case 4:
                  topicTitle = 'ReactJS';
                  break;
                default:
                  topicTitle = 'Unknown';
                  break;
              }
              return (
                <tr key={id}>
                  <td>{item.id}</td>
                  <td>{topicTitle}</td>
                  <td>
                    <a href={`/result/${item.id}`} style={{ textDecoration: 'none' }}>
                      <button>Xem chi tiet</button>
                    </a>
                  </td>
                </tr>
              )
            }

            )}
          </tbody>


        </table>
      </div>

    </>
  )
}

export default Answers