// import React from "react";
import "./Login.css";
// import Logo from "../../images/Logo.png"
import Logo from "../../images/logo2.svg";
import shakeHands from "../../images/shakinghand.gif";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../API/axios';

const TextError = (props) => {
    return props.success ? (<p></p>) : (
        <p className="text-danger" >incorrect username/password Or your status is still <mark>pending</mark>  </p>
    )

}
TextError.propTypes = {
    success: PropTypes.bool.isRequired,
};

const intialState = {
    username: "",
    password: "",
    error: "",
    success: true
}


const Login = () => {
    const navigate = useNavigate();
    const [userstate, setUserState] = useState(intialState);

    const navigateToSignUp = () => {
        navigate('/signup');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(userstate);
            const res = await axios.post('/login',

                JSON.stringify({
                    username: userstate.username,
                    password: userstate.password
                }),
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );
            if (res)
                console.log(res);
            const data = await res.data;
            if (data.success) {
                setUserState(prevState => ({ ...prevState, success: true }))
                // console.log(data.id);
                if (data.role === 'admin') {
                    navigate(`/CurrentUsers`);
                } else if (data.role === 'manager') {
                    navigate(`/matches`);
                } else {
                    navigate(`/matches`);
                }

            }
        } catch (Err) {
            setUserState(prevState => ({ ...prevState, success: false }))
            console.log(Err);
        }
    }

    function handlechange(e) {
        const { name, value } = e.target;
        setUserState(prevState => ({ ...prevState, [name]: value }))
    }

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
                <form onSubmit={handleSubmit} className="FromGroup">
                    <input
                        className="UserName FormInputs"
                        type="text"
                        placeholder="User Name"
                        name="username"
                        value={userstate.username}
                        onChange={handlechange}
                        required />

                    <input className="password FormInputs"
                        type="password"
                        name="password"
                        value={userstate.password}
                        placeholder="Password"
                        onChange={handlechange}
                        required />

                    <TextError success={userstate.success} />
                    <button className="LoginBtn" > Login </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

