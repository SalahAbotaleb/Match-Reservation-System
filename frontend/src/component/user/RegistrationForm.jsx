import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./RegistrationForm.css";
import axios from "../../API/axios";

const REGISTER_ENDPOINT = "/register";

const intialFormState = {
    FirstName: "",
    LastName: "",
    UserName: "",
    Email: "",
    City: "",
    Address: "",
    Birthdate: "",
    gender: "male",
    Role: "fan",
    Password: "",
    ConfirmedPassword: "",
};

const uniqueUserName = false; // this is a boolean that will be set to true if the user name is unique 
const initPasswordVerification = {
    islengthy: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpclChar: false,
    Confirm: false,
};


function RegistrationFrom() {
    const [CurrentUserState, setUserState] = useState(intialFormState); // state is an object that has all the values of the form
    const [CurrPasswordVerification, setPassword] = useState(initPasswordVerification);
    const navigateToUserHome = useNavigate();

    const [isUniqueUserName, setUniueUserName] = useState(uniqueUserName);
    // const navigate = () => {
    //     navigateToUserHome('/UserHome');
    // };
    if (isUniqueUserName) {
        console.log("user name is unique");
    }
    useEffect(() => { }, [CurrentUserState])
    function handleOnChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        setUserState(prevState => ({ ...prevState, [name]: value }));
        let mconfirm = false;
        if (name === "Password") {
            const mislengthy = (value.length) >= 8;
            const mhasUpper = /[A-Z]/.test(value);
            const mhasLower = /[a-z]/.test(value);
            const mhasNumber = /[0-9]/.test(value);
            const mhasSpclChar = /[@,#,$,%,&]/.test(value);
            setPassword(prevState => ({
                ...prevState, islengthy: mislengthy
                , hasLower: mhasLower,
                hasNumber: mhasNumber,
                hasUpper: mhasUpper,
                hasSpclChar: mhasSpclChar,
                Confirm: mconfirm,
            }))
        }
        if (name === "ConfirmedPassword") {
            mconfirm = (CurrentUserState.Password === value);
            setPassword(prevState => ({
                ...prevState,
                Confirm: mconfirm,
            }))
        }
        if (name === "UserName") {
            setUniueUserName(false);
        }

    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            username: CurrentUserState.UserName,
            firstName: CurrentUserState.FirstName,
            lastName: CurrentUserState.LastName,
            birthDate: CurrentUserState.Birthdate,
            gender: CurrentUserState.gender,
            city: CurrentUserState.City,
            address: CurrentUserState.Address,
            email: CurrentUserState.Email,
            role: CurrentUserState.Role,
            status: "Active",
            password: CurrentUserState.Password,
        }

        try {
            const response = await axios.post(REGISTER_ENDPOINT,
                JSON.stringify(dataToSend),
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );

            console.log(response.data);
            navigateToUserHome('/login');
        } catch (err) {
            console.log(err.message);
        }
    }





    return (<Container>
        <Row>
            <Col>
                <h1 className="RegistrationHeader">Registration</h1>
            </Col>
        </Row>
        <hr />
        <Row>
            <Col>
                <Form onSubmit={handlesubmit}>

                    <Form.Group  >
                        <Form.Label >First Name </Form.Label>
                        <br />
                        <Form.Control
                            className="FormInputBox"
                            type="text"
                            name="FirstName"
                            value={CurrentUserState.FirstName}
                            onChange={handleOnChange}
                            placeholder="First Name"
                            required />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Last Name </Form.Label>
                        <br />
                        <Form.Control
                            className="FormInputBox"
                            type="text"
                            name="LastName"
                            onChange={handleOnChange}
                            value={CurrentUserState.LastName}
                            placeholder="Last Name"
                            required />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>User Name </Form.Label>
                        <br />
                        <Form.Control
                            className="FormInputBox"
                            type="text"
                            name="UserName"
                            onChange={handleOnChange}
                            value={CurrentUserState.UserName}
                            placeholder="User Name"
                            required />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Email</Form.Label>
                        <br />
                        <Form.Control
                            className="FormInputBox"
                            type="email"
                            name="Email"
                            onChange={handleOnChange}
                            placeholder="Email"
                            value={CurrentUserState.Email}
                            required />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>City </Form.Label>
                        <br />
                        <Form.Control className="FormInputBox"
                            value={CurrentUserState.City}
                            type="text"
                            name="City"
                            onChange={handleOnChange}
                            placeholder="City"
                            required />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Address </Form.Label>
                        <br />
                        <Form.Control className="FormInputBox"
                            value={CurrentUserState.Address}
                            type="text"
                            onChange={handleOnChange}
                            name="Address"
                            placeholder="Address" />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Birthdate</Form.Label>
                        <br />
                        <Form.Control
                            className="FormInputBox"
                            type="date"
                            name="Birthdate"
                            placeholder="Birthdate"
                            onChange={handleOnChange}
                            value={CurrentUserState.Birthdate}
                            required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Gender</Form.Label>
                        <br />
                        <Form.Select className="FormInputBox"
                            onChange={handleOnChange}
                            name="gender"
                            value={CurrentUserState.gender}
                            required >
                            <option>male</option>
                            <option>female </option>
                        </Form.Select>

                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <br />
                        <Form.Select className="FormInputBox"
                            onChange={handleOnChange}
                            value={CurrentUserState.Role}
                            name="Role" required>
                            <option>fan</option>
                            <option>manager </option>
                            <option>admin </option>
                        </Form.Select>

                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Password </Form.Label>
                        <br />
                        <Form.Control
                            className="FormInputBox"
                            onChange={handleOnChange}
                            type="password"
                            name="Password"
                            value={CurrentUserState.Password}
                            placeholder="Password"
                            required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <br />
                        <Form.Control className="FormInputBox"
                            type="password"
                            onChange={handleOnChange}
                            name="ConfirmedPassword"
                            value={CurrentUserState.ConfirmedPassword}
                            placeholder="Confirm password" required />
                    </Form.Group>

                    <ul className="mb-4">
                        <li className="text-danger">user name should be unique</li>
                        <li className={CurrPasswordVerification.islengthy ? "text-success" : "text-danger"}>Min 8 charachters </li>
                        <li className={CurrPasswordVerification.hasUpper ? "text-success" : "text-danger"}>At least one upper Case </li>
                        <li className={CurrPasswordVerification.hasLower ? "text-success" : "text-danger"}>At least one lower case </li>
                        <li className={CurrPasswordVerification.hasNumber ? "text-success" : "text-danger"}>At least one number </li>
                        <li className={CurrPasswordVerification.hasSpclChar ? "text-success" : "text-danger"}>At least one special charachter i.e @ * $ % & </li>
                        <li className={CurrPasswordVerification.Confirm ? "text-success" : "text-danger"}>ConfirmedPassword is the same as Password</li>

                    </ul>




                    <Button variant="dark" type="submit" disabled={Object.values(CurrPasswordVerification).includes(false)}>
                        Submit
                    </Button>
                </Form >



            </Col >
        </Row >


    </Container >
    );
}

export default RegistrationFrom; 