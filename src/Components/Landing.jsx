import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import monk from '../assets/monk_2.png'
import monk_faces from '../assets/monk_happy.png'
import monk_lifting from '../assets/monk_lift.png'
import monk_reflection from '../assets/monk_reflection.png'
import sun from '../assets/sun.png'
import rain from '../assets/rain.png'
import arrow from '../assets/arrow.png'
import waterfall from '../assets/waterfall.png'
import cherry_blossom from '../assets/pink_tree.png'
import temple from '../assets/temple.png'
import monk_temple from '../assets/monk_temple.png'

import '../App.css'

function Landing() {
    const navigate = useNavigate();

    const loginPage = () => {
        navigate("/login")
    }

    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 300); // Delay for a natural effect
    }, []);


    return (
        <>



            <div className='parent5'>


                <img src={waterfall} alt="Waterfall" className={`waterfall-bg slide-in ${show ? "show" : ""}`} />
                <img src={monk_temple} className={`temple slide-in ${show ? "show" : ""}`} />

                <div className="page-content">
                    <div className='top_landing'>

                        <img src={monk} className='monk_logo'></img>


                        <div className='main_landing'>
                            <h1 className='title'>Mindestry</h1>
                            <p className='main_p'> Control Your Thoughts Control Your Life</p>
                            <p className='main_p'> Turn Negative Thoughts Into Positive Ones</p>
                            <p className='main_p2'> Live The Life You Want</p>


                            <button onClick={loginPage} className='thought-btn'>Take Control</button>





                        </div>




                    </div>







                    <h2 className="sub_seca2">Your Thoughts Control Your Life</h2>
                    <p className="subtitlea">In multiple ways including:</p>
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





                    <h2 className='title_margin'>Transform Negative Thoughts</h2>
                    <p className='subtitlea'>Make Them Positive</p>

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
                            <p> "I can do it!"</p>

                        </div>

                    </div>
                </div>

            </div>








        </>
    )
}

export default Landing
