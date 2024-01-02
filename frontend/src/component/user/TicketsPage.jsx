import Ticket from './Ticket'
import "./TicketsPage.css";
import Footer from '../layout/Footer/Footer'
import NavBar from '../layout/NavBar/NavBar'
import { Container, Row, Col } from "react-bootstrap";

const TicketsPage = () => {

    async function getmatches() {
        const response = await fetch('http://localhost:3000/matches');
        return response.json();
    }

    const previoustickets =
        [
            {
                Price: '300',
                locations: 'Cairo International Stadium',
            },
            {
                Price: '320',
                locations: '30 June Stadium',
            },
            {
                Price: '2323',
                locations: 'Assiut',
            }
        ]

    return (
        <div className='PageTickets'>
            <NavBar></NavBar>
            <Container style={{border: 0, marginTop: 20}}>
                <Row>
                    <Col>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h1>Tickets History</h1>
                        </div>
                    </Col>
                </Row>

                {previoustickets.length > 0 ? (
                    previoustickets.map((ticket) => (
                        <Ticket key={ticket.id} ticket={ticket} />
                    ))
                ) : (
                    "Book Your first ticket"
                )}
            </Container >
            <Footer></Footer>
        </div>
    )
}

export default TicketsPage