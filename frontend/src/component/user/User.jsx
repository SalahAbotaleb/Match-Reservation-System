// import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import axios from "../../API/axios";
import { useState } from "react";

const User = (props) => {


  const user = props.user;
  const deleteuser = async (e) => {
    e.preventDefault();
    try {
      console.log("ids send to allUsers.jsx");
      console.log(user._id);
      const response = await axios.delete(`/users/${user._id}`,
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      console.log("Teraaaa respond");
      console.log(response.data);
      window.location.reload(); // refresh the page
    } catch (err) {
      console.log(err.message);
    }
  }

  const [showduseretails, setuserdetailsbutton] = useState(false)


  return (
    <Container className='Ticket container-sm' style={{ border: 0, paddingTop: 10, paddingBottom: 10 }}>
      <Row style={{ marginLeft: 10, marginTop: 10 }}>
        <Col><p>UserName : {user.username}</p></Col>
        <Col> <Button onClick={() => setuserdetailsbutton(!showduseretails)} style={{ backgroundColor: showduseretails ? 'red' : 'green', borderColor: showduseretails ? 'red' : 'green' }}>
          {showduseretails ? 'Hide Details' : 'Show Details'} </Button> </Col>
      </Row>
      {showduseretails && <div>
        <Row style={{ marginLeft: 10, marginTop: 10 }}>
          <Col><p>Name : {user.firstName} {user.lastName}</p></Col>
          <Col><p>Role : {user.role}</p></Col>
        </Row>

        <Row style={{ marginLeft: 10, marginTop: 10 }}>
          <Col><p>email : {user.email} </p> </Col>
        </Row>

        <Row style={{ marginLeft: 500, marginBottom: 20 }}>
          <Col> <Button disabled={user.role == 'admin'} onClick={(e) => deleteuser(e)} style={{ width: 200, backgroundColor: 'red', borderColor: 'red' }}> Delete User </Button> </Col>
        </Row>
      </div>
      }

    </Container>
  )
}
export default User