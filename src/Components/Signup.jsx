import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import monk from '../assets/monk_2.png'


import '../App.css'

function Signup() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            // Send signup request to backend
            const response = await axios.post('http://localhost:5001/api/signup', { username, password });

            const token = response.data.token;

            // Store the token (preferably in an httpOnly cookie)
            localStorage.setItem('token', token);
            navigate(`/home`);
        } catch (error) {
            console.error('Signup failed:', error);
            alert('Signup failed: ' + error.response.data.error);
        }
    };





    const homePage = () => {
        navigate("/")
    }

    const loginPage = () => {
        navigate("/login")
    }

    return (
        <>
            <div className='parent'>
                <div className='top_landing2'>
                    <img src={monk} className='monk_login' onClick={homePage}></img>

                </div>

                <div>
                    <h1 className='sub_sec'>Live The Life You Want</h1>

                    <p className='subtitle2'>Control Your Thoughts</p>
                </div>
            </div>

            <div className='login'>
                <div className='login_div'>
                    <label>
                        <span>
                            Username
                        </span>
                    </label>
                    <form className='form'>
                        <input type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required>

                        </input>
                    </form>
                    <label>
                        <span>
                            Password
                        </span>
                    </label>
                    <form className='form'>
                        <input type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required>

                        </input>
                    </form>
                    <button className="signup-btn" onClick={handleSignup}>
                        Sign Up
                    </button>

                </div>

            </div>

            <div className='signup'>



                <p className='subtitle2'> Already Have An Account? </p>
                <button className='link' onClick={loginPage}>Sign In</button>


            </div>


        </>
    )

}

export default Signup
