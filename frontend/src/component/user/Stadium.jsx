import { useState } from "react";
import "./StadiumsPage.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Stadium = ({ stad }) => {
  const [showdetails, setdetailsbutton] = useState(false)

  return (
    <Container className="stadium">
      <Row>
        <Col> <h3> {stad.text} </h3> </Col>
        <Col> <Button style={{ backgroundColor: showadd ? 'red' : 'green' }} onClick={() => setdetailsbutton(!showdetails)}> 
        {showdetails ? 'Hide details' : 'Show details'} </Button> </Col>
      </Row>
      {showdetails && <p>{stad.address}</p>}
    </Container>
  )
}

export default Stadium

