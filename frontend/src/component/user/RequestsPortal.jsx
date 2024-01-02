import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Request from "./Request"
import Footer from '../layout/Footer/Footer'
import NavBar from '../layout/NavBar/NavBar'
import { useState, useEffect } from "react";
import "./RequestsPortal.css";

async function getrequests() {
  const response = await fetch('http://localhost:3000/requests', {
      credentials: 'include'
  });
  console.log(response);
  return response;
}

const RequestsPortal = () => {

  const [Requests, setRequests] = useState([]);

  useEffect(() => {
    getrequests().then((data) => {
      setRequests(data);
    });
  }, []);

  const requests =
    [
      {
        username: 'Cairo International',
        firstName: 'giza',
        lastName: 'adadd',
        role: 'Manager',
      },
      {
        username: 'Cairo International',
        firstName: 'giza',
        lastName: 'adadd',
        role: 'Manager',
      },
      {
        username: 'Cairo International',
        firstName: 'giza',
        lastName: 'adadd',
        role: 'Manager',
      },
      {
        username: 'Cairo International',
        firstName: 'giza',
        lastName: 'adadd',
        role: 'Manager',
      }
    ]

  return (
    <div className='PageRequests'>
      <NavBar loggedIn={true} ></NavBar>
      <Container style={{ border: 0, marginTop: 20, minHeight: '100%' }}>
        <Row>
          <Col>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h1>User Requests</h1>
            </div>
          </Col>
        </Row>
        <br />
        {Requests.length > 0 ? (
          Requests.map((request) => (
            <Request key={request.id} request={request} />
          ))
        ) : (
          "You Are Free Today. Let's Have A Coffee"
        )}
        <Footer></Footer>

      </Container>
    </div>
  )
}

export default RequestsPortal