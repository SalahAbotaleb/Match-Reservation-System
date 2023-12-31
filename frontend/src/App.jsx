import Signup from "./component/user/Signup";
import Login from "./component/user/Login";
import './App.css';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import LandingPage from "./component/user/LandingPage";
import Matches from "./component/Matches/Matches.jsx";
import Match from "./component/Matches/match.jsx";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/matches" element={<Matches />} />
                    <Route path={'/match/:id'} element={<Match/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App
