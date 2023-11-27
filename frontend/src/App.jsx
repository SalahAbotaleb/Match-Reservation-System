import Signup from "./component/user/Signup";
import Login from "./component/user/Login";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./component/user/LandingPage";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App
