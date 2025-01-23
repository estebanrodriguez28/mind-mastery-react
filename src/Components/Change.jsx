import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import monk from '../assets/monk_2.png'
import rain from '../assets/rain.png'
import arrow from '../assets/arrow.png'
import sun from '../assets/sun.png'
import '../App.css'

function Change() {

    const negative_thought = sessionStorage.getItem('negative_thought');

    const [positive_thought, set_pthought] = useState('');
    const navigate = useNavigate();

    const thoughtPage = () => {
        navigate("/thought")
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents adding a new line in the textarea
            navigate('/change'); // Replace with your target route
        }
    };

    return (
        <>
            <div className='parent2'>
                <div className='top_landing2'>

                    <img src={monk} className='monk_thought' onClick={thoughtPage}></img>

                </div>
                <h1 className="sub_sec">Turn The Negative Thought Positive</h1>
                <p className="subtitle">Either Yourself or With AI Feature!</p>
                <div className='all_thoughts'>

                    <div className='thought-card'>
                        <img src={rain} className='card-icon'></img>
                        <h3> Negative Thought </h3>
                        <p> The Thought You Put: </p>


                        <textarea readOnly>
                            {negative_thought}
                        </textarea>


                    </div>

                    <div className='arrow'>

                        <img src={arrow} className='arrow_img'></img>
                    </div>

                    <div className='thought-card'>
                        <img src={sun} className='card-icon'></img>
                        <h3> Positive Thought </h3>
                        <p> New Positive Version Of Thought </p>

                        <form>
                            <textarea
                                maxLength="500"
                                placeholder="I can't do it"
                                onKeyDown={handleKeyDown}
                                value={negative_thought}
                                onChange={(e) => set_nthought(e.target.value)}
                                required>
                            </textarea>
                        </form>

                    </div>
                </div>






            </div>
        </>
    )
}

export default Change
