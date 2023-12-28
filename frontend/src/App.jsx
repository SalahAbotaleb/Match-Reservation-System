import Signup from "./component/user/Signup";
import Login from "./component/user/Login";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./component/user/LandingPage";
import UserHomeTest from "./component/user/UserHomeTest";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/UserHome" element={<UserHomeTest />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App
