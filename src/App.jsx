
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Landing from "./Components/Landing";
import Signup from "./Components/Signup"
import Thought from "./Components/Thought"
import Change from "./Components/Change"

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
            </Routes>
        </Router>
    );
}

export default App;
