import { useState } from "react";
import "./StadiumsPage.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Stadium = ({ stad }) => {
  const [showdetails, setdetailsbutton] = useState(false)

  return (
    <Container>
      <Row>
        <Col> <h3> {stad.text} </h3> </Col>
        <Col> <Button onClick={() => setdetailsbutton(!showdetails)} style={{ backgroundColor: showdetails ? 'red' : 'green' }}> 
        {showdetails ? 'Hide details' : 'Show details'} </Button> </Col>
      </Row>
      {showdetails && <p>{stad.address}</p>}
    </Container>
  )
}

export default Stadium

