import { useState } from "react";
import Stadium from "./Stadium"
import "./StadiumsPage.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Stadiumspage = () => {

    const [showadd, setaddbutton] = useState(false)
    const [name, setName] = useState('')
    const [rows, setrows] = useState('')
    const [columns, setcol] = useState('')
    const [location, setlocation] = useState('Alexandria')

    const handling = async (e) => {
        e.preventDefault();

    }


    const stadiums =
        [
            {
                text: 'Cairo International',
                address: 'giza',
            },
            {
                text: 'Alex International',
                address: 'giza',
                rows: '100',
            }
        ]

    return (
        <Container className="page">
            <Row>
                <Col>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h1>Stadiums</h1>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={() => setaddbutton(!showadd)} style={{ backgroundColor: showadd ? 'red' : 'blue' }}> {showadd ? 'Close' : 'Add Stadium'}</Button>
                </Col>
            </Row>
            {showadd && <Container>
                <Row>
                    <Form.Group>
                        <Form.Label>Stadium Name</Form.Label>
                        <br />
                        <Form.Control
                            className="FormInputBox"
                            type="text"
                            name="stadiumname"
                            placeholder="Stadium Name"
                            // onChange={handleOnChange}
                            // value={CurrentUserState.Birthdate}
                            required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Government</Form.Label>
                        <br />
                        <Form.Select
                            className="FormInputBox"
                            // onChange={handleOnChange}
                            // value={CurrentUserState.Role}
                            name="Government" required>
                            <option>Alexandria</option>
                            <option>Assiut </option>
                            '<option>Aswan</option>'
                            '<option>Beheira</option>'
                            '<option>Bani Suef</option>'
                            '<option>Cairo</option>'
                            '<option>Daqahliya</option>'
                            '<option>Damietta</option>'
                            '<option>Fayyoum</option>'
                            '<option>Gharbiya</option>'
                            '<option>Giza</option>'
                            '<option>Ismailia</option>'
                            '<option>Kafr El Sheikh</option>'
                            '<option>Marsa Matrouh</option>'
                            '<option>Minya</option>'
                            '<option>Monofiya</option>'
                            '<option>New Valley</option>'
                            '<option>North Sinai</option>'
                            '<option>Port Said</option>'
                            '<option>Qalioubiya</option>'
                            '<option>Qena</option>'
                            '<option>Red Sea</option>'
                            '<option>Sharqiya</option>'
                            '<option>Sohag</option>'
                            '<option>South Sinai</option>'
                            '<option>Suez</option>'
                            '<option>Tanta</option>'
                        </Form.Select>

                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Number of Rows</Form.Label>
                        <br />
                        <Form.Control
                            className="FormInputBox"
                            type="text"
                            name="rows"
                            placeholder="# Rows"
                            // onChange={handleOnChange}
                            // value={CurrentUserState.Birthdate}
                            required />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Number of Columns</Form.Label>
                        <br />
                        <Form.Control
                            className="FormInputBox"
                            type="text"
                            name="columns"
                            placeholder="# Columns"
                            // onChange={handleOnChange}
                            // value={CurrentUserState.Birthdate}
                            required />
                    </Form.Group>
                </Row>
            </Container>
            }

            {/* <div>
                {stadiums.map((stad) => (
                    <Stadium key={stad.id} stad={stad} />))}
            </div> */}

        </Container>
    )
}

export default Stadiumspage

