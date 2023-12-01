// import React from "react";
import "./Login.css";
// import Logo from "../../images/Logo.png"
import Logo from "../../images/logo2.svg";
import shakeHands from "../../images/shakinghand.gif";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const navigateToSignUp = () => {
        navigate('/signup');
    };
    return (
        <div className="ContainerLogin">

            <div className="SideBar">
                <img src={shakeHands} width="70" height="70" />
                <h1>Hello, stranger !</h1>
                <div className="msgLogin"> Enter yout personal data and start looking for the next match</div>
                <button className="SignupBtn" onClick={navigateToSignUp}> Sign up </button>
            </div>
            <div className="LoginForm">

                <img height="100px" width="100" src={Logo} alt="Logo" />
                <h1>Welcome, back</h1>
                <form className="FromGroup">
                    <input
                        className="UserName FormInputs"
                        type="text"
                        placeholder="User Name"
                        required />

                    <input className="password FormInputs"
                        type="password"
                        placeholder="Password"
                        required />

                    <button className="LoginBtn"> Login </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

