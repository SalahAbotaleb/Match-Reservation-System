import { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./ProfileForm.css";
import PropTypes from 'prop-types';
import axios from "../../API/axios";

// props = {userID }

const initPasswordVerification = {
    islengthy: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpclChar: false,
    Confirm: false,
};

const IntialUserState = {
    FirstName: "",
    LastName: "",
    UserName: "",
    Email: "",
    City: "",
    Address: "",
    Birthdate: "",
    gender: "Male",
    Role: "Fan",
    Password: "",
    ConfirmedPassword: "",
};


// ...

ProfileForm.propTypes = {
    userID: PropTypes.string.isRequired,
};
// const pageloaded = false;

function ProfileForm(props) {
    console.log(IntialUserState);
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`/users/${props.userID}`);
            console.log("data fetched here ");
            console.log(response.data);

            setCurrentUserState(response.data);

        } catch (error) {
            console.error('Error:', error);

        }

    };



    useEffect(() => {
        fetchUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const [CurrentUserState, setCurrentUserState] = useState(IntialUserState);
    const [CurrPasswordVerification, setPassword] = useState(initPasswordVerification);


    function handleOnChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        setCurrentUserState(prevState => ({ ...prevState, [name]: value }));
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

    }


    const handleUpdate = async (e) => {
        e.preventDefault();

    }



    return (



        < Container >
            <Row>
                <Col>
                    <h1 className="ProfileHeader">User Profile</h1>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Form onSubmit={handleUpdate}>

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
                            />
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
                                placeholder={CurrentUserState.LastName}
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>User Name </Form.Label>
                            <br />
                            <Form.Control
                                className="FormInputBox"
                                type="text"
                                name="UserName"
                                value={IntialUserState.UserName}
                                placeholder="User Name"
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Email</Form.Label>
                            <br />
                            <Form.Control
                                className="FormInputBox"
                                type="email"
                                name="Email"
                                placeholder="Email"
                                value={CurrentUserState.Email}
                                required
                                readOnly
                            />
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
                            />
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
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <br />
                            <Form.Select className="FormInputBox"
                                onChange={handleOnChange}
                                name="gender"
                                value={CurrentUserState.gender}
                                required >
                                <option>Male</option>
                                <option>Female </option>
                            </Form.Select>

                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Role</Form.Label>
                            <br />
                            <Form.Select className="FormInputBox"
                                onChange={handleOnChange}
                                value={CurrentUserState.Role}
                                name="Role" required>
                                <option>Fan</option>
                                <option>Manager </option>
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
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <br />
                            <Form.Control className="FormInputBox"
                                type="password"
                                onChange={handleOnChange}
                                name="ConfirmedPassword"
                                value={CurrentUserState.ConfirmedPassword}
                                placeholder="Confirm password" />
                        </Form.Group>

                        <ul className="mb-4">
                            <li className={CurrPasswordVerification.islengthy ? "text-success" : "text-danger"}>Min 8 charachters </li>
                            <li className={CurrPasswordVerification.hasUpper ? "text-success" : "text-danger"}>At least one upper Case </li>
                            <li className={CurrPasswordVerification.hasLower ? "text-success" : "text-danger"}>At least one lower case </li>
                            <li className={CurrPasswordVerification.hasNumber ? "text-success" : "text-danger"}>At least one number </li>
                            <li className={CurrPasswordVerification.hasSpclChar ? "text-success" : "text-danger"}>At least one special charachter i.e @ * $ % & </li>
                            <li className={CurrPasswordVerification.Confirm ? "text-success" : "text-danger"}>ConfirmedPassword is the same as Password</li>

                        </ul>

                        <Button variant="dark" type="submit" disabled={CurrentUserState.Password != "" || Object.values(CurrPasswordVerification).includes(false)}>
                            Update
                        </Button>
                    </Form >



                </Col >
            </Row >


        </Container >
    );

}

export default ProfileForm; 