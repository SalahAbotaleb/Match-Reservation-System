import Signup from "./component/user/Signup";
import Login from "./component/user/Login";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./component/user/LandingPage";
import UserHomeTest from "./component/user/UserHomeTest";
import Userprofile from "./component/user/Userprofile";
import Matches from "./component/Matches/Matches.jsx";
import Match from "./component/Matches/match.jsx";
import AddMatch from "./component/Matches/AddMatch.jsx";
import RequestsPortal from "./component/user/RequestsPortal.jsx";
import StadiumsPage from "./component/user/StadiumsPage.jsx";
import AllUsers from "./component/user/AllUsers.jsx";
import TicketsPage from "./component/user/TicketsPage.jsx";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/UserHomeTest" element={<UserHomeTest />} />
                    <Route path="/Userprofile" element={<Userprofile />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/matches" element={<Matches />} />
                    <Route path={'/match/:id'} element={<Match/>}/>
                    <Route path="/AddMatch" element={<AddMatch/>}/>
                    <Route path="/Portal" element={<RequestsPortal/>}/>
                    <Route path="/CurrentUsers" element={<AllUsers/>}/>
                    <Route path="/Stadiums" element={<StadiumsPage/>}/>
                    <Route path="/Tickets" element={<TicketsPage/>}/>

                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App
