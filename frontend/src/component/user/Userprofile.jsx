import "./Userprofile.css";
import NavBar from "../layout/NavBar/NavBar";
import Footer from "../layout/Footer/Footer";
import ProfileForm from "./PorfileForm";
import { useParams } from "react-router";

// import RegistrationForm from "./RegistrationForm";

//6593bf9f74fcb57dbf31186c
const Userprofile = () => {

    const { id } = useParams();

    return (

        <div className="page-container">
            <div className="NavBarPos">
                <NavBar loggedIn={true} />
            </div>

            <div className="ProfileForm scrollableProfile">
                <div className="jumbotronProfile">
                    <ProfileForm userID={id} />
                </div>
            </div>

            <div className="FooterPos">
                <Footer />
            </div>

        </div>

    );
};


export default Userprofile;

