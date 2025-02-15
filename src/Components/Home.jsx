import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import monk from '../assets/monk_2.png'
import axios from 'axios';
import beach from '../assets/beach.png'
import island from '../assets/tropical.png'
import garden from '../assets/garden.png'
import wave from '../assets/wave.png'
import zen from '../assets/zen.png'
import hot_spring from '../assets/hot_spring.png'

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

  const changePage = () => {
    navigate("/change")
  }


  const handleClick = (thoughtId) => {
    navigate("/edit", { state: { thoughtId } });
  };

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 300); // Delay for a natural effect
  }, []);



  return (
    <>
      <div className='parent2'>
        <img src={zen} className={`zen slide-in ${show ? "show" : ""}`} />
        <img src={hot_spring} className={`zen2 slide-in ${show ? "show" : ""}`} />

        <div className='container'>
          <div className='top-element'>

            <img src={monk} className='monk_login' onClick={loginPage}></img>
            <div className='home_welcome'>
              <h1 className='sub_sec2'>Welcome {username}</h1>
              <p className='subtitle2'>Master Your Mind. Master Your Life.</p>
            </div>
          </div>


        </div>



        <div className='thoughts_list'>
          <h1 className='sub_sec3'> ---- Thoughts ---- </h1>



          {

            thoughts.length > 0 ? (


              <div>
                <button onClick={changePage} className='thought-btn'>Add Thought</button>

                {thoughts.map((thought) => (


                  <div
                    key={thought._id}
                    className={thought.isPositive ? "thought_bubble3" : "thought_bubble2"}
                    onClick={() => handleClick(thought._id)}
                  >


                    <h2 className='sub_thought'>{thought.title}</h2>
                  </div>




                ))}
              </div>) : (


              <>
                <h3 className='subtitle3'>Create your first thought</h3>
                <button onClick={changePage} className='thought-btn'>Add Thought</button>

              </>



            )
          }



        </div>




      </div>



    </>
  )
}

export default Home
