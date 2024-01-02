import "./LandingPage.css";
import Logo from "../../images/stadium.jpg";
import Footer from "../layout/Footer/Footer";
import NavBar from "../layout/NavBar/NavBar";
import Fast from "../../images/Feature_Fast.svg";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "../../API/axios";

const Features = () => {
    return (
        <section id="features">
            <div className="container px-4 py-5" id="hanging-icons">
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                    <div className="col d-flex align-items-start">
                        <div
                            className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" fill="currentColor" className="bi bi-check2-circle"
                                viewBox="0 0 16 16">
                                <path
                                    d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                                <path
                                    d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="fs-2 text-body-emphasis">Easy to use. </h3>
                            <p> convenient easy way to book your match and see your favourite team plays</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start">
                        <div
                            className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <img src={Fast} width="40px" height="40px"></img>

                        </div>
                        <div>
                            <h3 className="fs-2 text-body-emphasis">Time saver</h3>
                            <p>Just open the website and choose your a match . Avoid booking a ticket hassel </p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start">
                        <div
                            className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" fill="currentColor" className="bi bi-arrow-through-heart"
                                viewBox="0 0 16 16">
                                <path
                                    d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l.53-.53c-.771-.802-1.328-1.58-1.704-2.32-.798-1.575-.775-2.996-.213-4.092C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182a21.86 21.86 0 0 1-2.685-2.062l-.539.54V14a.5.5 0 0 1-.146.354l-1.5 1.5Zm2.893-4.894A20.419 20.419 0 0 0 8 12.71c2.456-1.666 3.827-3.207 4.489-4.512.679-1.34.607-2.42.215-3.185-.817-1.595-3.087-2.054-4.346-.761L8 4.62l-.358-.368c-1.259-1.293-3.53-.834-4.346.761-.392.766-.464 1.845.215 3.185.323.636.815 1.33 1.519 2.065l1.866-1.867a.5.5 0 1 1 .708.708L5.747 10.96Z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="fs-2 text-body-emphasis">Guaranteed to work.</h3>
                            <p> based on fans review , reliability is one of our main concerns </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}

const UserExFeature = () => {
    return (
        <div className="ExperianceContainer">
            <h1>Improve the fan experience</h1>
            <p>
                Fans want a seamless and stress-free experience to see their team play  .
                <mark>E7GZLY</mark>  make this possible with up-to-date location and event information.
                With a wayfinding app for your stadium, fans are able to get an accurate view of the venue, at home or onsite.
                Our solution allows stadiums to keep their venue maps up-to-date,showcase events and advertising,
                and layer on additional experiences such as real-time indoor positioning that use accurate location-based data. You can also provide parking and wait-time updates, in-seat experiences, and more.

            </p>
        </div>


    );
}


const ImgSection = (props) => {
    const navigate = useNavigate();
    const handleBook = () => {
        // eslint-disable-next-line react/prop-types
        if (props.Role === 'fan' || props.Role === 'manager' || props.Role === 'admin') {
            navigate("/matches");
        } else {
            navigate("/signup");
        }
    }
    return (
        <div className="imgSection">
            <div className="herogredient"></div>
            <img id="bgImg" width="100%" src={Logo}></img>
            <div className="onImgText">
                <h1>Book your match now</h1>
                <p>Book your match now and see your favourite team plays</p>

                <button onClick={handleBook} className='bookBtn'> Book your Ticket </button>
            </div>
        </div >
    );

}

const LandingPage = () => {
    const getRole = async () => {
        try {
            const res = await axios.get('/userRole', { withCredentials: true });
            if (res) {
                console.log(res);
                return res.data;
            }
        } catch (Err) {
            console.log(Err);
        }
    }

    const [Role, setRole] = useState()

    useEffect(() => {
        getRole().then((data) => {
            setRole(data);
        });
    }, []);

    return (
        <div>
            <NavBar loggedIn={Role === 'fan' || Role === 'manager' || Role === 'admin'} />
            <ImgSection Role={Role} />
            <Features />
            <UserExFeature />
            <Footer />
        </div>
    );
};

export default LandingPage;

