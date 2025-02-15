import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { Check } from "lucide-react";
import axios from 'axios';

import monk from '../assets/monk_2.png'
import rain from '../assets/rain.png'
import arrow from '../assets/arrow.png'
import sun from '../assets/sun.png'
import '../App.css'



function Change() {



    const [p_thought, set_pthought] = useState('');
    const [title, set_title] = useState('');
    const [n_thought, set_nthought] = useState('');

    const navigate = useNavigate();

    const homePage = () => {
        navigate("/home")
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {

            try {

                event.preventDefault(); // Prevents adding a new line in the textarea
                if (p_thought.length == 0) {
                    alert("Field is required!");
                    return;
                }

                const token = localStorage.getItem('token'); // Retrieve token stored after login
                if (!token) {
                    console.error('No token found');
                    return;
                }


                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/thoughts`, {


                    title,
                    p_thought,
                    n_thought

                },

                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },

                    }


                );

                navigate('/home'); // Replace with your target route

            }

            catch (error) {
                console.error('Error:', error.response?.data?.error || 'Unknown error');
            }

        }
    };




    const createThought = async () => {


        try {


            if (p_thought.length == 0 || title.length == 0 || n_thought.length == 0) {
                alert("Field is required!");
                return;
            }

            const token = localStorage.getItem('token'); // Retrieve token stored after login
            if (!token) {
                console.error('No token found');
                return;
            }


            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/thoughts`, {


                title,
                p_thought,
                n_thought

            },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                }


            );

            navigate('/home'); // Replace with your target route

        }

        catch (error) {
            console.error('Error:', error.response?.data?.error || 'Unknown error');
        }


    };




    const useGpt = async (inputText) => {
        try {
            if (inputText.length > 0) {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ai`, { inputText });
                set_pthought(response.data.ai_thought);
            }

        } catch (error) {
            console.error('Error fetching analysis:', error.response?.data || error.message);
        }

    };

    return (
        <>
            <div className='parent5'>


                <img src={monk} className='monk_normal3' onClick={homePage}></img>


                <h1 className="sub_sec">Create Your Thought</h1>
                <p className="subtitle4">Click the green checkmark to create the thought!</p>


                <form>
                    <label className='title-label'>Thought Title:</label>
                    <textarea className='text_title'
                        maxLength="35"
                        placeholder='(e.g. Doubt)'
                        value={title}
                        onChange={(e) => set_title(e.target.value)}
                        required
                    />
                </form>
                <div className='all_thoughts'>





                    <div className='nthought-card' style={{ opacity: 1 }}>
                        <img
                            src={rain}
                            className='card-icon3'
                        ></img>

                        <h3> Negative Thought </h3>
                        <p> Enter A Negative Thought Holding You Back: </p>



                        <form>
                            <textarea
                                maxLength="200"
                                value={n_thought}
                                onChange={(e) => set_nthought(e.target.value)}
                                placeholder="I can't do it :("
                                required
                            />


                        </form>


                    </div>


                    <div className='convert'>

                        <img src={arrow} className='arrow_img3'></img>
                        <button
                            className='custom-button'
                            onClick={() => useGpt(n_thought)}
                            data-tooltip-id="ai-tooltip"
                        >



                        </button>
                        <Tooltip
                            id="ai-tooltip"
                            className="custom-tooltip"
                            place="bottom"
                            content="Use AI to change your negative thought!"
                        />

                        <button
                            className="square-check-button2"
                            onClick={createThought}
                            data-tooltip-id="check-tooltip"
                        >
                            <Check size={40} className="square-check-icon" />
                        </button>
                    </div>



                    <div className='pthought-card' style={{ opacity: 1 }}>
                        <img src={sun} className='card-icon3'></img>
                        <h3> Positive Thought </h3>
                        <p> Enter A Positive Version Of Negative Thought: </p>

                        <form>
                            <textarea
                                maxLength="200"
                                placeholder="I can do it !"
                                value={p_thought}
                                onChange={(e) => set_pthought(e.target.value)}
                                required
                            />


                        </form>

                    </div>
                </div>






            </div>
        </>
    )

}
export default Change
