
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Landing from "./Components/Landing";
import Signup from "./Components/Signup"
import Thought from "./Components/Thought"
import Change from "./Components/Change"
import Edit from "./Components/Edit"
import Practice from "./Components/Practice";

function App() {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/thought" element={<Thought />} />
                <Route path="/change" element={<Change />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/practice" element={<Practice />} />
            </Routes>
        </Router>
    );
}

export default App;
