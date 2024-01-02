import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import axios from "../../API/axios";

const Request = ({ request }) => {

  const changestatus = async (e) => {
    e.preventDefault();
    const dataToSend = {
        name: CurrentUserState.stadiumname,
    }
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/requests/users/:id',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: JSON.stringify(dataToSend),
        });
        console.log(response.data);
    } catch (err) {
        console.log(err.message);
    }
}

  return (
    <Container className='Ticket container-sm' style={{ border: 0, height: 200, paddingTop: 10 }}>
        <Row style={{ marginLeft: 10, marginTop: 10 }}>
          <p>UserName : {request.username}</p>
        </Row>
        <Row style={{ marginLeft: 10, marginTop: 10 }}>
          <Col><p>Name : {request.firstName} {request.lastName}</p></Col>
          <Col><p>Requested Role : {request.role}</p></Col>
        </Row>
        <Row style={{ marginLeft: 300 }}>
          <Col> <Button onClick={() => changestatus()} style={{ width: 100, backgroundColor: 'green', borderColor: 'green' }}> Accept </Button> </Col>
          <Col> <Button onClick={() => changestatus()} style={{ width: 100, backgroundColor: 'red', borderColor: 'red' }}> Reject </Button> </Col>
        </Row>
    </Container>
  )
}
export default Request