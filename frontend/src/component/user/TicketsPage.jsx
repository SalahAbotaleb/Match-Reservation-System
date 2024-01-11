import { useState, useEffect } from "react";
import Ticket from './Ticket'
import "./TicketsPage.css";
import Footer from '../layout/Footer/Footer'
import NavBar from '../layout/NavBar/NavBar'
import { Container, Row, Col } from "react-bootstrap";
import axios from "../../API/axios";

//make request on userID

const GetUserId = async () => {
    const response = await axios.get("/userId", { withCredentials: true });
    var User_ID = response.data;
    console.log("UserID");
    console.log(response);
    return User_ID;
};

const gettickets = async (id) => {
    try {
        const response = await axios.get(`/users/${id}/tickets`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
};

const TicketsPage = () => {

    const [Tickets, setTickets] = useState([]);

    useEffect(() => {
        GetUserId().then(userId => {
            gettickets(userId).then((data) => {
                setTickets(data);
            });
        });

    }, []);

    return (
        <div className='PageTickets'>
            <NavBar loggedIn={true}></NavBar>
            <Container style={{ border: 0, marginTop: 20 }}>
                <Row>
                    <Col>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h1>Tickets History</h1>
                        </div>
                    </Col>
                </Row>


                {Tickets.length > 0 ? (
                    Tickets.map((ticket) => (
                        <Ticket key={ticket.id} ticket={ticket} />

                    ))
                ) : (
                    <h3> You Don't Have Any Tickets. Go Book Your First Ticket in "Nile دورى"</h3>
                )}

            </Container>
            <div className="FooterPos">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default TicketsPage