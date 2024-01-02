// import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import axios from "../../API/axios";

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

  return (
    <Container className='container-sm' style={{ border: 0, height: 200, paddingTop: 10 }}>
      <Row style={{ marginLeft: 10, marginTop: 10 }}>
        <p>UserName : {user.username}</p>
      </Row>
      <Row style={{ marginLeft: 10, marginTop: 10 }}>
        <Col><p>Name : {user.firstName} {user.lastName}</p></Col>
        <Col><p>Role : {user.role}</p></Col>
      </Row>

      <Row style={{ marginLeft: 10, marginTop: 10 }}>
        <Col><p>email : {user.email} </p> </Col>
      </Row>

      <Row style={{ marginLeft: 500 }}>
        <Col> <Button disabled={user.role == 'admin'} onClick={(e) => deleteuser(e)} style={{ width: 200, backgroundColor: 'red', borderColor: 'red' }}> Delete User </Button> </Col>
      </Row>
    </Container>
  )
}
export default User