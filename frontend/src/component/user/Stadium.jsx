import { useState } from "react";
import "./StadiumsPage.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';


const Stadium = ({ stad }) => {
  const [showdetails, setdetailsbutton] = useState(false)

  return (
    
    <div>
      <Row style={{ marginLeft: 50 }}>
        <Col> <h3> {stad.text} </h3> </Col>
        <Col> <Button onClick={() => setdetailsbutton(!showdetails)} style={{ backgroundColor: showdetails ? 'red' : 'green' }}>
          {showdetails ? 'Hide details' : 'Show details'} </Button> </Col>
      </Row>
      {showdetails && <div style={{ marginLeft: 100 }}>
        <Row> <Col>{stad.address}</Col> <Col></Col> </Row>
        <br />
        <Row> <Col> Rows = </Col> <Col> Columns = </Col> </Row>
      </div>}
      <br />
    </div>

  )
}

export default Stadium

