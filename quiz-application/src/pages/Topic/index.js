import React, { useEffect, useState } from 'react'
import './style.css'
import { getTopicList } from './../../services/topicService';
const Topic = () => {
  const [topic, setTopic] = useState([]);
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await getTopicList();
        if (!response) {
          throw new Error('Khong co topic')
        } else {
          setTopic(response)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchTopic();
  }, [])
  return (
    <>
      <h2>Danh sach chu de on luyen</h2>
      <div>
        <table className='table__topic'>
          <th>ID</th>
          <th>Ten chu de</th>

          {topic.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <a href={`/quiz/${item.id}`} style={{ textDecoration: 'none' }}>
                  <button>Làm bài</button>
                </a>
              </td>
            </tr>
          ))}

        </table>
      </div>

    </>
  )
}

export default Topic