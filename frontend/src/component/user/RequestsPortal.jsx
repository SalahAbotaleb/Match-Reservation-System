import { Container, Row, Col } from "react-bootstrap";
// import Button from 'react-bootstrap/Button';
import Request from "./Request"
import Footer from '../layout/Footer/Footer'
import NavBar from '../layout/NavBar/NavBar'
import { useState, useEffect } from "react";
import "./RequestsPortal.css";
import axios from "../../API/axios";

const getrequests = async () => {
  try {
    const response = await axios.get('/requests', { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};



const RequestsPortal = () => {

  const [UsersRequests, setUsersRequests] = useState([]);

  useEffect(() => {
    getrequests().then(data => {
      console.log("data in UseEeffec")
      console.log(data);
      setUsersRequests(data);
    });
  }, []);

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
        {UsersRequests.length > 0 ? (
          UsersRequests.map((request) => (
            <Request key={request.id} request={request} />
          ))
        ) : (
          <h3> 😻You Are Free Today. Let's Have A Coffee 👩‍❤️‍👩 </h3>
        )}

      </Container>


      <div className="FooterPos">
        <Footer />
      </div>
    </div>
  )
}

export default RequestsPortal