
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./RegistrationForm.css";
function RegistrationFrom() {
    return (<Container>
        <Row>
            <Col>
                <h1 className="RegistrationHeader">Registration</h1>
            </Col>
        </Row>
        <hr />
        <Row>
            <Col>
                <Form>

                    <Form.Group  >
                        <Form.Label >First Name </Form.Label>
                        <br />
                        <Form.Control className="FormInputBox" type="text" placeholder="First Name" required />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Last Name </Form.Label>
                        <br />
                        <Form.Control className="FormInputBox" type="text" placeholder="Last Name" required />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>User Name </Form.Label>
                        <br />
                        <Form.Control className="FormInputBox" type="text" placeholder="User Name" required />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Email</Form.Label>
                        <br />
                        <Form.Control className="FormInputBox" type="email" placeholder="Birthdate" required />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>City </Form.Label>
                        <br />
                        <Form.Control className="FormInputBox" type="text" placeholder="City" required />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Address </Form.Label>
                        <br />
                        <Form.Control className="FormInputBox" type="text" placeholder="Address" />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Birthdate</Form.Label>
                        <br />
                        <Form.Control className="FormInputBox" type="date" placeholder="Birthdate" required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Gender</Form.Label>
                        <br />
                        <Form.Select className="FormInputBox" required >
                            <option>Male</option>
                            <option>Female </option>
                        </Form.Select>

                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <br />
                        <Form.Select className="FormInputBox" required>
                            <option>Fan</option>
                            <option>Manager </option>
                        </Form.Select>

                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <br />
                        <Form.Control className="FormInputBox" type="password" placeholder="Password" required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <br />
                        <Form.Control className="FormInputBox" type="password" placeholder="Confirm password" required />
                    </Form.Group>

                    <ul className="mb-4">
                        <li className="text-danger">Min 8 charachters </li>
                        <li className="text-danger">At least one upper Case </li>
                        <li className="text-danger">At least one lower case </li>
                        <li className="text-danger">At least one number </li>
                        <li className="text-danger">At least one special charachter i.e @ * $ % & </li>
                    </ul>




                    <Button variant="dark" type="submit">
                        Submit
                    </Button>
                </Form>



            </Col>
        </Row>


    </Container>
    );
}

export default RegistrationFrom; 