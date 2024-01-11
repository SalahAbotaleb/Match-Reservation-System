import React from 'react'
import "./TicketsPage.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import axios from "../../API/axios";

const GetUserId = async () => {
  const response = await axios.get("/userId", { withCredentials: true });
  var User_ID = response.data;
  console.log("UserID");
  console.log(response);
  return User_ID;
};

const Ticket = ({ ticket }) => {

  const [id, setid] = useState([]);

  useEffect(() => {
    GetUserId().then(data => {
      setid(data);
    });
  }, []);


  const deleteticket = async (e) => {
    e.preventDefault();
    try {
      console.log("ids send to allUsers.jsx");
      const response = await axios.delete(`/users/${id}/tickets/${ticket._id}`,
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      console.log("Teraaaa respond");
      console.log(response.data);
      window.location.reload(); // refresh the page
    } catch (err) {
      console.log(err.message);
    }
  }
  //same as navbar, text white and bold
  return (
    <Container className='Ticket container-sm' style={{ border: 0, minHeight: 200, paddingTop: 10 }}>
      <Row>
        <Col>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h3>{ticket.match.homeTeam.name}</h3>
            <h5> &nbsp; VS &nbsp; </h5>
            <h3>{ticket.match.awayTeam.name}</h3>
          </div> </Col>
      </Row>
      <Row style={{ marginLeft: 100, marginTop: 10 }}>
        <Col> Price: {ticket.match.ticketPrice} </Col>
        <Col>Stadium: {ticket.match.stadium.name} </Col>
      </Row>

      <Row style={{ marginLeft: 100, marginTop: 10 }}>
        <Col> Date: {ticket.match.date} </Col>
        <Col> Ticket ID: {ticket._id} </Col>
      </Row>

      {ticket.locations.map((location, index) => {
        console.log("location");
        console.log(location);

        return (
          <Row key={index} style={{ marginLeft: 100, marginTop: 10 }}>
            <Col> Row: {location.row} </Col>
            <Col> Column: {location.column} </Col>
          </Row>
        );
      })}





      <div style={{ marginBottom: 10, marginRight: 20, display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
        <Row>
          <Col>
            <Button className='Cancel' style={{ backgroundColor: 'white', borderColor: 'black', color: 'black' }} onClick={(e) => deleteticket(e)}> Cancel Reservation </Button>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
//app.delete('/users/:id/tickets/:ticketId'
export default Ticket