import React from "react";
import "./Signup.css";
import Logo from "../../images/Logo.png"




const Signup = () => {
    return (
        
        <div className="Container">
            <div id="tsparticles"></div>

           <div className="Side">
                <img height="100px" width="100" src={Logo} alt="Logo" />
                <h1>Welcome, back</h1>    
                <div className="msgLogin"> To keep sharing your work with us, please log in.</div >
                    <button className="loginBtn"> Login </button>
            </div>
            <div className="SignupForm">
            
                <h1 className="header1"> Create an Account </ h1> 
                <p>hurry up! to know more about future matches </p>                
                <form>
                <input
                                className="Firstname"
                                type="text"
                                placeholder="First Name"                              
                                required />
                <input  className="Firstname" 
                                type="text"
                                placeholder="Last Name"                              
                                required /> 

                <input  className="Firstname"
                                type="text"
                                placeholder="User Name "                              
                                required /> 


                <input  className="password" 
                                type="password"
                                placeholder="Password"                              
                                required />                                   
                </form>
                
                <button className="SignupBtn"> Signup </button>

            </div> 
        </div>
    );
};

export default Signup;

