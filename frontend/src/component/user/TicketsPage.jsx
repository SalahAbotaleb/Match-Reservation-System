import Ticket from './Ticket'
import "./TicketsPage.css";
import Footer from '../layout/Footer/Footer'
import NavBar from '../layout/NavBar/NavBar'

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
        <div>
            <div className="PageTickets">
                <div>
                    {previoustickets.map((ticket) => (
                        // {previoustickets.length > 0 ? <Ticket key={ticket.id} ticket={ticket} /> : "Book Your first ticket"}
                        <Ticket key={ticket.id} ticket={ticket}></Ticket>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TicketsPage


