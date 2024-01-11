
import './NavBar.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import brandLogo from "../../../images/logo2.svg";
import Button from 'react-bootstrap/esm/Button';
import PropTypes from 'prop-types';
import axios from "../../../API/axios";
import { useEffect, useState } from "react";
// ...

NavBar.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
};


const ButtonsUsed = (props) => {

    const LogOut = async () => {

        try {
            const res = await axios.get('/logout', { withCredentials: true });
            if (res) {
                console.log(res);
                window.location.href = '/';
            }
        } catch (Err) {
            console.log(Err);
        }
    }

    if (props.loggedIn) {
        return (
            <Button onClick={LogOut} href="/" className="NavSignup"> LogOut  </Button>
        )
    }
    else {
        return (
            <>
                <Button href="/signup" className='NavSignup'>Register </Button>
                <Button href="/login" className="NavLogin"> Login  </Button>
            </>
        )
    }
}

ButtonsUsed.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
};




function NavBar(props) {
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

    // eslint-disable-next-line no-unused-vars
    const { loggedIn } = props;

    return (
        <Navbar expand="lg" className="CustomBg Custom" variant='dark' sticky='top'>
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt="brand logo"
                        src={brandLogo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{'  '}
                    E7GZLY
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {Role !== 'fan' && Role !== 'manager' && Role !== 'admin' && <Nav.Link href="/">Home</Nav.Link>}
                        {Role === 'fan' && <Nav.Link href="/">Home</Nav.Link>}

                        {Role === 'fan' && <Nav.Link href="/Tickets">Tickets</Nav.Link>}
                        <Nav.Link href="/matches">Matches</Nav.Link>
                        {(Role === 'fan' || Role === 'manager') && <Nav.Link href="/UserProfile">UserProfile</Nav.Link>}

                        {Role === "manager" && <Nav.Link href="/Stadiums">Stadiums</Nav.Link>}
                        {Role === 'admin' && <Nav.Link href="/CurrentUsers">Users</Nav.Link>}
                        {Role === 'admin' && <Nav.Link href="/Portal">Portal</Nav.Link>}

                    </Nav>


                    <ButtonsUsed loggedIn={loggedIn} />

                </Navbar.Collapse>

            </Container>
        </Navbar>

    )
}

export default NavBar 