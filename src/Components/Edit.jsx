import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Trash2 } from 'lucide-react';
import { Tooltip } from "react-tooltip";
import { Dumbbell } from 'lucide-react';
import { Check } from "lucide-react";
import axios from 'axios';
import monk from '../assets/monk_2.png'
import rain from '../assets/rain.png'
import arrow from '../assets/arrow.png'
import sun from '../assets/sun.png'
import '../App.css'



function Edit() {

    const location = useLocation();
    const { thoughtId } = location.state || {};

    const [n_thought, set_nthought] = useState("")
    const [p_thought, set_pthought] = useState("")
    const [title, set_title] = useState("")
    const [isPositive, set_positive] = useState(false)



    useEffect(() => {
        const fetchThought = async () => {
            try {

                const response = await axios.get('http://localhost:5001/api/thought', {
                    params: {
                        thoughtId: thoughtId
                    }
                });

                set_nthought(response.data.thought.n_thought)
                set_pthought(response.data.thought.p_thought)
                set_title(response.data.thought.title)
                set_positive(response.data.thought.isPositive)
            } catch (error) {
                console.error('Error fetching notes:', error.response?.data?.error || error.message);
            }
        };

        fetchThought();
    }, []);






    const navigate = useNavigate();

    const homePage = () => {
        navigate("/home")
    }

    const practicePage = (thoughtId) => {
        navigate("/practice", { state: { thoughtId } });
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {

            try {

                event.preventDefault(); // Prevents adding a new line in the textarea
                if (p_thought.length == 0 || n_thought.length == 0 || title.length == 0) {
                    alert("Field is required!");
                    return;
                }


                await axios.put("http://localhost:5001/update/thought", {

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

    const editThought = async () => {


        try {


            if (p_thought.length == 0 || n_thought.length == 0 || title.length == 0) {
                alert("Field is required!");
                return;
            }


            await axios.put("http://localhost:5001/update/thought", {

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


    };




    const deleteThought = async () => {
        try {
            await axios.delete(`http://localhost:5001/delete/${thoughtId}`);
            navigate('/home');
        } catch (error) {
            console.error("Failed to delete:", error.response.data);
        }
    };





    const useGpt = async (inputText) => {
        try {
            const response = await axios.post('http://localhost:5001/api/ai', { inputText });
            set_pthought(response.data.ai_thought);
        } catch (error) {
            console.error('Error fetching analysis:', error.response?.data || error.message);
        }

    };

    return (
        <>
            <div className='parent5'>
                <img src={monk} className='monk_normal3' onClick={homePage}></img>

                {
                    isPositive ? (
                        <>
                            <h1 className="sub_sec">Congratulations On Sticking To Your Positive Thought</h1>
                            <p className="subtitle">You should be so proud of overcoming the negative thought!</p>


                            <div className='pthought-card2' style={{ opacity: 1 }}>
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
                            <h1 className="sub_sec">Edit, Practice, or Delete Your Thought</h1>
                            <p className="subtitle">Click the green checkmark at the bottom to save all changes!</p>


                            <form>
                                <label className='title-label'>Thought Title</label>
                                <textarea className='text_title'
                                    maxLength="35"
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
                                            required
                                        />


                                    </form>


                                </div>

                                <div className='convert2'>

                                    <img src={arrow} className='arrow_img2'></img>
                                    <button className='custom-button' onClick={() => useGpt(n_thought)}></button>
                                    <button className="delete-btn"
                                        data-tooltip-id="ai-tooltip">
                                        <Dumbbell className="dumbell-icon"
                                            onClick={() => practicePage(thoughtId)}
                                        />

                                    </button>
                                    <Tooltip
                                        id="ai-tooltip"
                                        className="custom-tooltip"
                                        place="bottom"
                                        content="Practice Your Positive Thought!"
                                    />

                                    <button
                                        className="square-check-button"
                                        onClick={editThought}
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

                                            value={p_thought}
                                            onChange={(e) => set_pthought(e.target.value)}
                                            required
                                        />


                                    </form>

                                </div>
                            </div>
                        </>
                    )
                }







                <div>
                    <button className="delete-btn" onClick={deleteThought}>
                        <Trash2 className="trash-icon" />
                    </button>

                </div>





            </div>
        </>
    )

}
export default Edit
