import React from 'react'
import "./TicketsPage.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";

const Ticket = ({ ticket }) => {

  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <Container className='Ticket container-sm' style={{ border: 0, height: 200, paddingTop: 10 }}>
      <Row>
        <Col>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h3>Teams</h3>
          </div> </Col>
      </Row>
      <Row style={{ marginLeft: 100, marginTop: 10 }}>
        <Col> Price: {ticket.Price} </Col>
        <Col>Stadium: {ticket.locations}</Col>
      </Row>

      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
        <Row>
          <Col>
            <Button className='Cancel' style={{backgroundColor: 'red', borderColor: 'red'}} onClick={{}}> Cancel Reservation </Button>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
//app.delete('/users/:id/tickets/:ticketId'
export default Ticket