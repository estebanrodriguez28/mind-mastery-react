import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import monk from '../assets/monk_2.png'
import axios from 'axios';

import '../App.css'

function Login() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            // Send sign-in request to backend

            const response = await axios.post('http://localhost:5001/api/signin', { username, password });

            // Navigate to the user's dashboard

            const token = response.data.token;

            // Store the token (preferably in an httpOnly cookie)
            localStorage.setItem('token', token);
            navigate(`/home`);
        } catch (error) {
            console.error('Sign in failed:', error);
            alert('Sign in failed: ' + error.response.data.error);
        }
    };





    const homePage = () => {
        navigate("/")
    }

    const signupPage = () => {
        navigate("/signup")
    }

    return (
        <>
            <div className='parent6'>

                <img src={monk} className='monk_login' onClick={homePage}></img>


                <div>
                    <h1 className='sub_sec2'>Continue Mastering Your Mind</h1>

                    <p className='subtitle2'>Through Practice</p>
                </div>



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
                            required></input>
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
                            required></input>
                    </form>
                    <button className="signup-btn" onClick={handleSignIn}>
                        Sign In
                    </button>

                </div>



                <div className='signup'>



                    <p className='subtitle2'> Don't have an account? </p>
                    <button className='link' onClick={signupPage}>Sign Up</button>


                </div>
            </div>

        </>
    )
}

export default Login
