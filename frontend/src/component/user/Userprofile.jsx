import "./Userprofile.css";
import NavBar from "../layout/NavBar/NavBar";
import Footer from "../layout/Footer/Footer";
import Logo from "../../images/stadium.jpg";

// import RegistrationForm from "./RegistrationForm";

const ImgSection = () => {
    return (
        <div className="ImgSectionProfile">
            <div className="herogredient2"></div>
            <img id="bgImg" width="100%" src={Logo}></img>

        </div >
    );

}


const Userprofile = () => {



    return (

        <div className="page-container">
            <div className="NavBarPos">
                <NavBar loggedIn={true} />
            </div>


            <div className="content-wrap">

                <ImgSection />

                {/* <div className="jumbotronProfile">
                        <RegistrationForm />
                    </div> */}

            </div>

            <div className="FooterPos">
                <Footer />
            </div>

        </div>

    );
};


export default Userprofile;

