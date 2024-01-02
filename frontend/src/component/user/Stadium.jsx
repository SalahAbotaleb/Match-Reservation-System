import { useState } from "react";
import "./StadiumsPage.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';


const Stadium = ({ stad }) => {
  const [showdetails, setdetailsbutton] = useState(false)

  return (
    
    <div>
      <Row style={{ marginLeft: 50 }}>
        <Col> <h3> {stad.name} </h3> </Col>
        <Col> <Button onClick={() => setdetailsbutton(!showdetails)} style={{ backgroundColor: showdetails ? 'red' : 'green' }}>
          {showdetails ? 'Hide details' : 'Show details'} </Button> </Col>
      </Row>
      {showdetails && <div style={{ marginLeft: 100 }}>
        <Row> <Col>{stad.location}</Col> <Col></Col> </Row>
        <br />
        <Row> <Col> Rows = {stad.dimensions.rows} </Col> <Col> Columns = {stad.dimensions.columns} </Col> </Row>
      </div>}
      <br />
    </div>

  )
}

export default Stadium
