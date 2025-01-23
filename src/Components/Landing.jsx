import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import monk from '../assets/monk_2.png'
import monk_faces from '../assets/monk_happy.png'
import monk_lifting from '../assets/monk_lift.png'
import monk_reflection from '../assets/monk_reflection.png'
import sun from '../assets/sun.png'
import rain from '../assets/rain.png'
import arrow from '../assets/arrow.png'
import '../App.css'

function Landing() {
    const navigate = useNavigate();

    const loginPage = () => {
        navigate("/login")
    }


    return (
        <>



            <div className='parent'>
                <div className='top_landing'>
                    <img src={monk} className='monk_logo'></img>
                    <div className='main_landing'>
                        <h1 className='title'>Mind Mastery</h1>
                        <p className='main_p'> Control Your Thoughts Control Your Life</p>
                        <p className='main_p'> Turn Negative Thoughts Into Positive Ones</p>
                        <p className='main_p2'> Live The Life You Want</p>

                        <button className="svg-cloud-button" onClick={loginPage}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" className="cloud-svg">
                                <path d="M60 50C30 50 30 90 60 80C40 100 70 110 100 100C120 120 160 110 160 90C170 100 200 80 180 70C200 40 150 30 120 50C100 30 80 40 60 50Z" />
                            </svg>
                            <span>Take Control</span>
                        </button>





                    </div>




                </div>
            </div>




            <div className='parent'>
                <h2 className="sub_sec">Your Thoughts Control Your Life</h2>
                <p className="subtitle">In multiple ways including:</p>
                <div className='thought_effects'>
                    <div className='card'>
                        <img src={monk_faces} className='card-icon'></img>
                        <h3> Feel </h3>
                        <p> How you feel about yourself</p>
                    </div>

                    <div className='card'>
                        <img src={monk_lifting} className='card-icon'></img>
                        <h3> Behavior </h3>
                        <p> What you do with your time</p>

                    </div>

                    <div className='card'>
                        <img src={monk_reflection} className='card-icon'></img>
                        <h3> View </h3>
                        <p> How you view yourself</p>
                    </div>
                </div>

            </div>


            <div>
                <h2 className='title_margin'>Transform Negative Thoughts</h2>
                <p className='subtitle'>Make Them Positive</p>

                <div className='thought_effects'>
                    <div className='card'>
                        <img src={rain} className='card-icon'></img>
                        <h3> Negative Thought </h3>
                        <p> "I cant do it" </p>
                    </div>

                    <div className='arrow'>

                        <img src={arrow} className='arrow_img'></img>
                    </div>


                    <div className='card'>
                        <img src={sun} className='card-icon'></img>
                        <h3> Positive Thought </h3>
                        <p> I can do it!</p>

                    </div>

                </div>


            </div>








        </>
    )
}

export default Landing
