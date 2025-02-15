import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import monk from '../assets/monk_2.png'


import '../App.css'

function Signup() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            // Send signup request to backend
            if (username.length < 3) {
                setError("Username must be at least 3 characters.");
                return;
            }
            if (password.length < 8) {
                setError("Password must be at least 8 characters.");
                return;
            }

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, { username, password });

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
            <div className='parent6'>

                <img src={monk} className='monk_login' onClick={homePage}></img>



                <div>
                    <h1 className='sub_sec2'>Live The Life You Want</h1>

                    <p className='subtitle2'>Control Your Thoughts</p>
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
                            minLength={3}
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
                            minLength={8}
                            required>

                        </input>
                    </form>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button className="signup-btn" onClick={handleSignup}>
                        Sign Up
                    </button>

                </div>



                <div className='signup'>



                    <p className='subtitle2'> Already Have An Account? </p>
                    <button className='link' onClick={loginPage}>Sign In</button>


                </div>
            </div >

        </>
    )

}

export default Signup
