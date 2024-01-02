import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import axios from "../../API/axios";
import NavBar from "../layout/NavBar/NavBar";
import Footer from "../layout/Footer/Footer";
import User from "./User"

const getusers = async () => {
    try {
      const response = await axios.get('/users', { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

const AllUsers = () => {

    const [Users, setusers] = useState([]);

    useEffect(() => {
        getusers().then((data) => {
            setusers(data);
        });
    }, []);

    return (
        <div className="alluserspage">
            <NavBar loggedIn={true}></NavBar>
            <Container className="AllUserspage">
                <Row>
                    <Col>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <h1>E7gezly Users</h1>
                        </div>
                    </Col>
                </Row>

                {Users.length > 0 ? (
                    Users.map((user) => (
                        <User key={user.id} user={user} />
                    ))
                ) : (
                    "No user are found"
                )}


            </Container>
            <Footer></Footer>
        </div>

    )
}

export default AllUsers
