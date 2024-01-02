import { useState, useEffect } from "react";
import Stadium from "./Stadium"
import "./StadiumsPage.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "../../API/axios";
import NavBar from "../layout/NavBar/NavBar";
import Footer from "../layout/Footer/Footer";


async function getstadiums() {
    const response = await fetch('http://localhost:3000/stadiums');
    return response.json();
}

const intialFormState = {
    Name: "",
    Location: "",
    Rows: "",
    Columns: "",
};


const Stadiumspage = () => {

    const [Stadiums, setStadiums] = useState([]);

    useEffect(() => {
        getstadiums().then((data) => {
            setStadiums(data);
        });
    }, []);
    const [showadd, setaddbutton] = useState(false)

    const [CurrentUserState, setUserState] = useState(intialFormState); // state is an object that has all the values of the form

    useEffect(() => { }, [CurrentUserState])

    function handleOnChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        setUserState(prevState => ({ ...prevState, [name]: value }));
        let mconfirm = false;
        if (name === "stadiumname") {
            setUniquestdium(false);
        }
    }
    
    const handlesubmit = async (e) => {
      e.preventDefault();
      const dataToSend = {
        name: CurrentUserState.stadiumname,
        location: CurrentUserState.Government,
        dimensions: {rows: CurrentUserState.rows, columns: CurrentUserState.columns},
      }  
      try {
        const response = await axios.post('/stadiums',
          JSON.stringify(dataToSend),
          { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        );
        console.log("Teraaaa respond");
        console.log(response.data);
      } catch (err) {
        console.log(err.message);
      }
    }

    return (
        <div className="PageStadiums">
            <NavBar loggedIn={true}></NavBar>
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
                        <Button onClick={() => setaddbutton(!showadd)} style={{ backgroundColor: showadd ? 'red' : 'blue', marginLeft: 1100, width: 150 }}> {showadd ? 'Close' : 'Add Stadium'}</Button>
                    </Col>
                </Row>
                {showadd && <Container className="overflow-hidden" style={{ border: 0, marginTop: 20, width: 1200, marginBottom: 50, marginLeft: 100}}>
                    <Row>

                        <Form onSubmit={handlesubmit}>
                            <Form.Group>
                                <Form.Control
                                    className="FormInputBoxSP"
                                    type="text"
                                    name="stadiumname"
                                    placeholder="Stadium Name"
                                    onChange={handleOnChange}
                                    value={CurrentUserState.stadiumname}
                                    required />
                            </Form.Group>

                            <Form.Group style={{marginTop: 10 }}>
                                <Form.Select
                                    className="FormInputBoxSP"
                                    onChange={handleOnChange}
                                    value={CurrentUserState.Government}
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
                                <Form.Control
                                    className="FormInputBoxSP"
                                    type="number"
                                    name="rows"
                                    placeholder="# Rows"
                                    onChange={handleOnChange}
                                    value={CurrentUserState.rows}
                                    required />
                            </Form.Group>

                            <Form.Group >
                                <Form.Control
                                    className="FormInputBoxSP"
                                    type="number"
                                    name="columns"
                                    placeholder="# Columns"
                                    onChange={handleOnChange}
                                    value={CurrentUserState.columns}
                                    required />
                            </Form.Group>

                            <div className="d-flex justify-content-center align-items-center">
                                <Button variant="dark" type="submit" style={{marginTop: 10}}>
                                    Save Changes
                                </Button>
                            </div>
                        </Form>
                    </Row>
                </Container>
                }

                {Stadiums.map((stad) => (
                    <Stadium key={stad.id} stad={stad} />))}

            </Container>
            <Footer></Footer>
        </div>

    )
}

export default Stadiumspage
