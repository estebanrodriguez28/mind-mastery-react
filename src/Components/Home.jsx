import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import monk from '../assets/monk_2.png'
import axios from 'axios';


import '../App.css'

function Home() {

  const [username, setUsername] = useState('');

  useEffect(() => {


    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token stored after login
        if (!token) {
          console.error('No token found');
          return;
        }
        const response = await axios.get('http://localhost:5001/api/home', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUsername(response.data.message.split(' ')[1]);

      }

      catch (error) {
        console.error('Error:', error.response?.data?.error || 'Unknown error');
      }

    };
    fetchUsername();


  }, []);

  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT
        const response = await axios.get('http://localhost:5001/api/thoughts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setThoughts(response.data.thoughts);
      } catch (error) {
        console.error('Error fetching notes:', error.response?.data?.error || error.message);
      }
    };

    fetchThoughts();
  }, []);


  const navigate = useNavigate();

  const loginPage = () => {
    navigate("/login")
  }

  const thoughtPage = () => {
    navigate("/thought")
  }

  const hasThoughts = thoughts.length > 0;


  return (
    <>
      <div className='container'>
        <div className='top-element'>

          <img src={monk} className='monk_login' onClick={loginPage}></img>
          <div className='home_welcome'>
            <h1 className='sub_sec'>Welcome {username}</h1>
            <p className='subtitle2'>Master Your Mind. Master Your Life.</p>
          </div>



        </div>


      </div>

      <div className='parent'>

        <div className='thoughts_list'>
          <h1 className='sub_sec'>Thoughts</h1>

          {
            hasThoughts ? (<ul>
              {thoughts.map((thought) => (
                <li key={thought._id} className="note">
                  <h2>{thought.thought_title}</h2>
                  <span>{new Date(thought.created_at).toLocaleString()}</span>
                </li>
              ))}
            </ul>) : (
              <>

                <h3 className='subtitle_2'>Create your first thought</h3>
                <button onClick={thoughtPage} className='thought-btn'>Add Thought</button>



              </>
            )
          }


        </div>
      </div>

    </>
  )
}

export default Home
