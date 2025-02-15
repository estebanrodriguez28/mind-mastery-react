import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import monk from '../assets/monk_2.png'
import rain from '../assets/rain.png'

import '../App.css'

function Thought() {

    const [negative_thought, set_nthought] = useState('');
    const [title, set_title] = useState('');
    const navigate = useNavigate();

    const homePage = () => {
        navigate("/home")
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents adding a new line in the textarea
            if (negative_thought.length == 0 || title.length == 0) {
                alert("Field is required!");
                return;
            }
            sessionStorage.setItem('negative_thought', negative_thought)
            sessionStorage.setItem('title', title)
            navigate('/change'); // Replace with your target route
        }
    };

    return (
        <>
            <div className='parent3'>
                <div className='top_landing2'>

                    <img src={monk} className='monk_thought' onClick={homePage}></img>
                </div>

                <div className='bad_thought'>

                    <div className='cloud-card'>
                        <img src={rain} className='card-icon'></img>
                        <h3> Negative Thought </h3>
                        <p> Enter A Thought Holding You Back: </p>

                        <form>
                            <textarea className='text_title'
                                maxLength="50"
                                placeholder="Give the thought a title"
                                value={title}
                                onChange={(e) => set_title(e.target.value)}
                                required
                            />
                        </form>

                        <form>
                            <textarea
                                maxLength="500"
                                placeholder="I can't do it (hit enter to move on)"
                                onKeyDown={handleKeyDown}
                                value={negative_thought}
                                onChange={(e) => set_nthought(e.target.value)}
                                required
                            />
                        </form>

                    </div>
                </div>






            </div>
        </>
    )
}

export default Thought
