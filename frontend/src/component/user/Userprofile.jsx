import "./Userprofile.css";
import NavBar from "../layout/NavBar/NavBar";
import Footer from "../layout/Footer/Footer";
import Logo from "../../images/stadium.jpg";
import RegistrationForm from "./RegistrationForm";

const ImgSection = () => {
    return (
        <div className="imgSection testimg">
            <div className="herogredient"></div>
            <img id="bgImg" width="100%" src={Logo}></img>

        </div >
    );

}


const Userprofile = () => {



    return (

        <div className="page-container">

            <div className="content-wrap">
                <NavBar loggedIn={true} />
                <div style={{ position: 'relative' }}>
                    <ImgSection />
                    <div className="SignupForm scrollable PersonalInfo" style={{ position: 'absolute', top: 0, left: 0 }}>
                        <div className="jumbotron">
                            <RegistrationForm />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            <Footer />

        </div>

    );
};


export default Userprofile;

