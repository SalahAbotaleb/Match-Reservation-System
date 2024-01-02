import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import axios from "../../API/axios";

const User = ({ user }) => {

//   const deleteuser = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await axios.request({
//             method: 'delete',
//             maxBodyLength: Infinity,
//             url: `http://localhost:3000/users/${user.id}`,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 withCredentials: true
//             },
//             data: JSON.stringify(),
//         });
//         console.log(response.data);
//     } catch (err) {
//         console.log(err.message);
//     }
// }

  return (
    <Container className='container-sm'  style={{ border: 0, height: 200, paddingTop: 10 }}>
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
          <Col> <Button onClick={() => deleteuser()} style={{ width: 200, backgroundColor: 'red', borderColor: 'red' }}> Delete User </Button> </Col>
        </Row>
    </Container>
  )
}
export default User