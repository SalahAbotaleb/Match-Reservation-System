
import './NavBar.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import brandLogo from "../../../images/logo2.svg";
import Button from 'react-bootstrap/esm/Button';
function NavBar() {

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
                        <Nav.Link className="LinkHover" href="/">Home</Nav.Link>
                        <Nav.Link className="LinkHover" href="/">About us </Nav.Link>
                        <Nav.Link className="LinkHover" href="/">Contact us</Nav.Link>
                        <NavDropdown title="Servecies" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">view future matches</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2"> book your seat </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Add accouncment to a match </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item href="/signup">Register</NavDropdown.Item>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>


                    <Button href="/signup" className='NavSignup'>Register </Button>

                    <Button href="/login" className="NavLogin"> Login  </Button>
                </Navbar.Collapse>

            </Container>
        </Navbar>

    )
}

export default NavBar 