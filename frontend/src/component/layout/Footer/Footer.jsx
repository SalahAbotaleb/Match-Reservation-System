// import React from "react";
import './Footer.css';
import logo from "../../../images/logo2.svg";

const Footer = () => {


  return (
    <div className="footerContainer" id="footerStyle">
      <div className="container">
        <footer className="py-3">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3" id="Whitetxt">
            <li className="nav-item" ><a href="#" className="nav-link px-2 WhiteText" >Home</a></li>
            <li className="nav-item"  ><a href="#" className="nav-link px-2 WhiteText" >Features</a></li>
            <li className="nav-item"  ><a href="#" className="nav-link px-2 WhiteText" >Pricing</a></li>
            <li className="nav-item"  ><a href="#" className="nav-link px-2 WhiteText" >FAQs</a></li>
            <li className="nav-item"  ><a href="#" className="nav-link px-2 WhiteText" >About</a></li>
          </ul>

          <p className="text-center WhiteText"><img src={logo} width="20px" height="20px"></img>   © 2023 E7GEZLY, Inc</p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
