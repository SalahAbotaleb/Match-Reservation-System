import React from 'react'
import "./StadiumsPage.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const Ticket = ({ ticket }) => {
    return (

        <Container>
        <Row>
          <Col> <h3> Teams </h3> </Col>
        </Row>
        <Row>
            <Col> Price: {ticket.Price} </Col>
            <Col>Stadium: {ticket.locations}</Col>
        </Row>
      </Container>
    )
}

export default Ticket