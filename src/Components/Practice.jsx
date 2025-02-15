import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Check } from "lucide-react";

import { Tooltip } from "react-tooltip";
import { Dumbbell } from 'lucide-react';
import Confetti from "react-confetti";

import axios from 'axios';
import monk from '../assets/monk_2.png'
import rain from '../assets/rain.png'
import arrow from '../assets/arrow.png'
import sun from '../assets/sun.png'
import '../App.css'



function Practice() {
    const [showSuccess, setShowSuccess] = useState(false);
    const location = useLocation();
    const { thoughtId } = location.state || {};

    const [n_thought, set_nthought] = useState("")
    const [p_thought, set_pthought] = useState("")
    const [title, set_title] = useState("")
    const [n_opacity, set_n_opacity] = useState(0.5)
    const [p_opacity, set_p_opacity] = useState(0.5)

    useEffect(() => {
        const fetchThought = async () => {
            try {

                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/thought`, {
                    params: {
                        thoughtId: thoughtId
                    }
                });

                set_nthought(response.data.thought.n_thought)
                set_pthought(response.data.thought.p_thought)
                set_title(response.data.thought.title)
                set_n_opacity(response.data.thought.n_opacity)
                set_p_opacity(response.data.thought.p_opacity)

            } catch (error) {
                console.error('Error fetching notes:', error.response?.data?.error || error.message);
            }
        };

        fetchThought();
    }, []);

    console.log(n_opacity)

    const navigate = useNavigate();

    useEffect(() => {
        const updateIsComplete = async () => {
            if (n_opacity <= 0.05) { // ✅ Floating point safe check


                try {
                    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/positive`, {
                        thoughtId: thoughtId,
                        isPositive: true // ✅ Updating boolean field
                    });



                    // ✅ Show success screen after update
                    setShowSuccess(true);

                    // ✅ Hide success screen and navigate after 3 seconds
                    setTimeout(() => {
                        setShowSuccess(false);
                        navigate("/home");
                    }, 8000);

                } catch (error) {
                    console.error("Failed to update isPositive:", error.response?.data || error.message);
                }
            }
        };

        updateIsComplete(); // ✅ Call the function inside useEffect

    }, [n_opacity, navigate]); // ✅ Runs whenever `n_opacity` changes








    const editPage = (thoughtId) => {
        navigate("/edit", { state: { thoughtId } })
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {

            try {

                event.preventDefault(); // Prevents adding a new line in the textarea
                if (p_thought.length == 0 || n_thought.length == 0 || title.length == 0) {
                    alert("Field is required!");
                    return;
                }


                await axios.put(`${import.meta.env.VITE_BACKEND_URL}/update/thought`, {

                    thoughtId,
                    title,
                    p_thought,
                    n_thought

                }


                );

                navigate('/home');

            }

            catch (error) {
                console.error('Error:', error.response?.data?.error || 'Unknown error');
            }

        }
    };





    const updateThought = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/opacity`, {
                thoughtId: thoughtId,
                n_opacity: n_opacity,
                p_opacity: p_opacity
            });
            navigate('/home');
        } catch (error) {
            console.error("Failed to update opacity:", error.response.data);
        }
    };



    const [isActive, setIsActive] = useState(false);
    const [isDisappearing, setIsDisappearing] = useState(false);

    const [isClicked, setIsClicked] = useState(false);




    const toggleAnimation = () => {
        setIsActive(true);
        setTimeout(() => setIsActive(false), 3000);

        setIsDisappearing(true);
        setTimeout(() => setIsDisappearing(false), 3000);

        setIsClicked(true);


        setTimeout(() => {
            setIsClicked(false);

        }, 600);



        /*set_n_opacity(n_opacity => n_opacity - n_opacity * 0.1)*/
        set_n_opacity(n_opacity => n_opacity - n_opacity * 0.2)
        set_p_opacity(p_opacity => p_opacity + p_opacity * 0.1)

    };




    return (
        <>
            <div className='parent5'>





                {
                    showSuccess ? (
                        <>
                            <img src={monk} className='monk_normal3'></img>
                            <Confetti numberOfPieces={200} />
                            <h1 className="sub_sec">Congratulations!</h1>
                            <p className="subtitle">You turned your negative thought positive!</p>
                            <div className='pthought-card2' style={{ opacity: p_opacity }}>
                                <img src={sun} className={`sun-image2 sun-glow`}></img>
                                <h3> Positive Thought </h3>


                                <form>
                                    <textarea
                                        value={p_thought}
                                        readOnly
                                    />


                                </form>

                            </div>

                        </>
                    ) : (

                        <>
                            <img src={monk} className='monk_normal3' onClick={() => editPage(thoughtId)}></img>
                            <h1 className="sub_sec">Practice Your Positive Thought</h1>
                            <p className="subtitle">Say the positive thought 5 times, in your head or outloud, then click the button!</p>



                            <div className='all_thoughts'>



                                <div className='nthought-card' style={{ opacity: n_opacity }}>
                                    <img
                                        src={rain}
                                        className={`rain-cloud ${isDisappearing ? "disappear-animation" : ""}`}
                                    ></img>

                                    <h3> Negative Thought </h3>



                                    <form>
                                        <textarea
                                            readOnly
                                            value={n_thought}

                                            required
                                        />


                                    </form>


                                </div>


                                <div className='convert2'>

                                    <img src={arrow} className='arrow_img2'></img>


                                    <button
                                        className={`delete-btn ${isClicked ? "bounce-effect" : ""}`}
                                        data-tooltip-id="ai-tooltip">
                                        <Dumbbell className="dumbell-icon2"
                                            onClick={toggleAnimation}
                                        />
                                    </button>
                                    <Tooltip
                                        id="ai-tooltip"
                                        className="custom-tooltip"
                                        place="bottom"
                                        content="Click To Strengthen Your Positive Thought!"
                                    />
                                </div>

                                <div className='pthought-card' style={{ opacity: p_opacity }}>
                                    <img src={sun} className={`sun-image ${isActive ? "sun-glow" : ""}`}></img>
                                    <h3> Positive Thought </h3>


                                    <form>
                                        <textarea
                                            value={p_thought}
                                            readOnly
                                        />


                                    </form>

                                </div>
                            </div>

                            <div>
                                <button
                                    className="square-check-button"
                                    onClick={updateThought}
                                    data-tooltip-id="check-tooltip"
                                >
                                    <Check size={40} className="square-check-icon" />
                                </button>
                                <Tooltip
                                    id="check-tooltip"
                                    className="custom-tooltip"
                                    place="top"
                                    content="Click To Save Your Progress!"
                                />

                            </div>
                        </>
                    )
                }






            </div >
        </>
    )

}
export default Practice
