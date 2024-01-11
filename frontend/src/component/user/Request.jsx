// import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import axios from "../../API/axios";


const Request = ({ request }) => {
  console.log("request in Request.jsx");
  console.log(request);
  const changestatus = async (e, state) => {
    e.preventDefault();
    const dataToSend = {
      action: state,
    }


    try {
      const response = await axios.post(`/requests/users/${request._id}`,
        JSON.stringify(dataToSend),
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      window.location.reload(); // refresh the page
      console.log("Teraaaa respond");
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Container className='Ticket container-sm' style={{ border: 0, height: 180, paddingTop: 10 }}>
      <Row style={{ marginLeft: 10, marginTop: 10 }}>
        <p>UserName : {request.username}</p>
      </Row>
      <Row style={{ marginLeft: 10, marginTop: 10 }}>
        <Col><p>Name : {request.firstName} {request.lastName}</p></Col>
        <Col><p>Requested Role : {request.role}</p></Col>
      </Row>
      <Row style={{ marginLeft: 300 }}>
        <Col> <Button onClick={(e) => changestatus(e, "accept")} style={{ width: 100, backgroundColor: 'green', borderColor: 'green' }}> Accept </Button> </Col>
        <Col> <Button onClick={(e) => changestatus(e, "reject")} style={{ width: 100, backgroundColor: 'red', borderColor: 'red' }}> Reject </Button> </Col>
      </Row>
    </Container>
  )
}
export default Request