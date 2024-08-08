import React, { useEffect, useState } from 'react'
import { getAnswersList } from './../../services/answers';

const Answers = () => {
  const [answers, setAnswers] = useState([]);
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
  console.log(answers)
  return (
    <>
      <h2>Danh sach bai da luyen tap</h2>
      <div>
        <table className='table__answers'>
          <th>ID</th>
          <th>Ten chu de</th>

          {answers.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <a href={`/answer/${item.id}`} style={{ textDecoration: 'none' }}>
                  <button>Xem chi tiet</button>
                </a>
              </td>
            </tr>
          ))}

        </table>
      </div>

    </>
  )
}

export default Answers