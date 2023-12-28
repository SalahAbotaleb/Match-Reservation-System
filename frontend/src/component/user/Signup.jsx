// import React from "react";
import "./Signup.css";
// import Logo from "../../images/Logo.png"
import Logo from "../../images/logo2.svg";
import RegistrationFrom from "./RegistrationForm";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const navigateTologin = () => {
        navigate('/Login');
    };
    return (

        <div className="Container " >

            <div className="Side nonScrollable">
                <img height="100px" width="100" src={Logo} alt="Logo" />
                <h1>Welcome, back</h1>
                <div className="msgLogin"> To keep sharing your work with us, please log in.</div>
                <button className="loginBtn" onClick={navigateTologin} > Login</button>
            </div>
            <div className="SignupForm scrollable">
                <div className="jumbotron">
                    <RegistrationFrom />
                </div>
            </div>
        </div>);
};

export default Signup;

