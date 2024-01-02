import { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./ProfileForm.css";
import axios from "../../API/axios";
// import { Global } from '@emotion/react';

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
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    city: "",
    address: "",
    birthdate: "",
    gender: "male",
    role: "fan",
    password: "",
    ConfirmedPassword: "",
};


// ...


// const pageloaded = false;
var GlobaluserID = "";
function ProfileForm() {

    const [CurrentUserState, setCurrentUserState] = useState(IntialUserState);
    const [CurrPasswordVerification, setPassword] = useState(initPasswordVerification);


    const GetUserId = async () => {
        const response = await axios.get("/userId", { withCredentials: true });
        var User_ID = response.data;
        console.log("UserID");
        console.log(response);
        return User_ID;
    }

    const fetchUserData = async (User_ID) => {
        console.log("fetching User data ");
        console.log(User_ID);
        try {
            const response = await axios.get(`/users/${User_ID}`, { withCredentials: true });
            console.log("data fetched here ");
            console.log(response.data);

            setCurrentUserState(prevState => ({ ...prevState, ...response.data }));
            console.log("current user state");
            console.log(CurrentUserState);

        } catch (error) {
            console.error('Error:', error);

        }

    };



    useEffect(() => {
        GetUserId().then(userId => {
            GlobaluserID = userId;
            fetchUserData(userId);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    function handleOnChange(e) {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name;
        setCurrentUserState(prevState => ({ ...prevState, [name]: value }));
        let mconfirm = false;
        if (name === "password") {
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
            mconfirm = (CurrentUserState.password === value);
            setPassword(prevState => ({
                ...prevState,
                Confirm: mconfirm,
            }))
        }

    }


    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("current user state");
        console.log(CurrentUserState);
        let dataToSend = {
            username: CurrentUserState.username,
            firstName: CurrentUserState.firstName,
            lastName: CurrentUserState.lastName,
            birthDate: CurrentUserState.birthdate,
            gender: CurrentUserState.gender,
            city: CurrentUserState.city,
            address: CurrentUserState.address,
            email: CurrentUserState.email,
            role: CurrentUserState.role,
        };
        if (CurrentUserState.password !== "") {
            dataToSend = {
                ...dataToSend,
                password: CurrentUserState.password,
            };
        }

        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(`/users/${GlobaluserID}`,
                JSON.stringify(dataToSend),
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );

            console.log("response after update");
            console.log(response);
            window.location.reload();
        } catch (err) {
            console.log(err.message);
        }



        console.log(dataToSend);
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

                        <Form.Group >
                            <Form.Label>First Name </Form.Label>
                            <br />
                            <Form.Control className="FormInputBox"
                                value={CurrentUserState.firstName}
                                type="text"
                                name="firstName"
                                onChange={handleOnChange}
                                placeholder={CurrentUserState.firstName}
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Last Name </Form.Label>
                            <br />
                            <Form.Control
                                className="FormInputBox"
                                type="text"
                                name="lastName"
                                onChange={handleOnChange}
                                value={CurrentUserState.lastName}
                                placeholder={CurrentUserState.lastName}
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>User Name </Form.Label>
                            <br />
                            <Form.Control
                                className="FormInputBox"
                                type="text"
                                name="username"
                                value={CurrentUserState.username}
                                placeholder={CurrentUserState.username}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Email</Form.Label>
                            <br />
                            <Form.Control
                                className="FormInputBox"
                                type="email"
                                name="email"
                                placeholder={CurrentUserState.email}
                                value={CurrentUserState.email}
                                required
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>City </Form.Label>
                            <br />
                            <Form.Control className="FormInputBox"
                                value={CurrentUserState.city}
                                type="text"
                                name="city"
                                onChange={handleOnChange}
                                placeholder={CurrentUserState.city}
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Address </Form.Label>
                            <br />
                            <Form.Control className="FormInputBox"
                                value={CurrentUserState.address}
                                type="text"
                                onChange={handleOnChange}
                                name="address"
                                placeholder={CurrentUserState.address} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Birthdate</Form.Label>
                            <br />
                            <Form.Control
                                className="FormInputBox"
                                type="date"
                                name="birthdate"
                                placeholder={CurrentUserState.birthdate}
                                onChange={handleOnChange}
                                value={CurrentUserState.birthdate}
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
                                <option>male</option>
                                <option>female </option>
                            </Form.Select>

                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Role</Form.Label>
                            <br />
                            <Form.Select className="FormInputBox"
                                value={CurrentUserState.role}
                                name="role"
                                required
                                readOnly>
                                <option>fan</option>
                                <option>manager </option>
                            </Form.Select>

                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Password </Form.Label>
                            <br />
                            <Form.Control
                                className="FormInputBox"
                                onChange={handleOnChange}
                                type="password"
                                name="password"
                                value={CurrentUserState.password}
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

                        <Button variant="dark" type="submit" disabled={CurrentUserState.password !== "" && Object.values(CurrPasswordVerification).includes(false)}>
                            Update
                        </Button>
                    </Form >



                </Col >
            </Row >


        </Container >
    );

}

export default ProfileForm; 