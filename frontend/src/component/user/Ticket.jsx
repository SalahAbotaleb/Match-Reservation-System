import React from 'react'
import "./StadiumsPage.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const Ticket = ({ ticket }) => {
  return (
    <Container className='Ticket container-sm' style={{border: 0, height: 100 }}>
      <Row>
        <Col>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h3>Teams</h3>
          </div> </Col>
      </Row>
      <Row>
        <Col> Price: {ticket.Price} </Col>
        <Col>Stadium: {ticket.locations}</Col>
      </Row>
    </Container>
  )
}
//app.delete('/users/:id/tickets/:ticketId'
export default Ticket