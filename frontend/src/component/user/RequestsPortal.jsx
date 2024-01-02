import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Request from "./Request"
import { useState, useEffect } from "react";

async function getrequests() {
  const response = await fetch('http://localhost:3000/requests');
  return response.json();
}

const RequestsPortal = () => {

  const [Requests, setRequests] = useState([]);

  useEffect(() => {
    getrequests().then((data) => {
      setRequests(data);
    });
  }, []);

  const requests =
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
      }
    ]

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h1>User Requests</h1>
            </div>
          </Col>
        </Row>
        <br />
        {requests.length > 0 ? (
          requests.map((request) => (
            <Request key={request.id} request={request} />
          ))
        ) : (
          "You Are Free Today. Let's Have A Coffee"
        )}
      </Container>
    </div>
  )
}

export default RequestsPortal