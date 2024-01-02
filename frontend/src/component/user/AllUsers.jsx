import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import axios from "../../API/axios";
import NavBar from "../layout/NavBar/NavBar";
import Footer from "../layout/Footer/Footer";
import User from "./User"

async function getusers() {
    const response = await fetch('http://localhost:3000/users');
    return response.json();
}

const AllUsers = () => {

    const [Users, setusers] = useState([]);

    useEffect(() => {
        getusers().then((data) => {
            setusers(data);
        });
    }, []);

    const usersdata =
    [
      {
        username: 'Cairo International',
        firstName: 'giza',
        lastName: 'adadd',
        role: 'Manager',
      },
      {
        username: 'Cairo International',
        firstName: 'giza',
        lastName: 'adadd',
        role: 'Manager',
      },
      {
        username: 'Cairo International',
        firstName: 'giza',
        lastName: 'adadd',
        role: 'Manager',
      },
      {
        username: 'Cairo International',
        firstName: 'giza',
        lastName: 'adadd',
        role: 'Manager',
      }
    ]

    return (
        <div className="alluserspage">
            <NavBar></NavBar>
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
