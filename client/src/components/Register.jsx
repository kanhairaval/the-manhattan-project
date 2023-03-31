import React, { useState } from "react";
import {Form, Button, Alert} from "react-bootstrap";
// import { useMutation} from "@apollo/client";
// import { REGISTER_USER } from "../utils/mutations";

import {createUser} from "../utils/API";
import {registerUserAuth} from "../utils/auth";

function Register () {
    const [userFormData, setUserFormData] = useState({name: '', email: '', password: ''});
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        try {
            const response = await createUser(userFormData);
            if (!response.ok) {
                throw new Error('something went wrong!');
            }
            const { token, user } = await response.json();
            console.log(user);
            registerUserAuth.login(token);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }
        setUserFormData({
            name: '',
            email: '',
            password: ''
        });
    };


    return (
        <Form onSubmit={handleFormSubmit} noValidate validated={validated}>
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
                Something went wrong with your login credentials!
            </Alert>
            <Form.Group>
                <Form.Label htmlFor="name">Full Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Your name"
                    name="name"
                    onChange={handleInputChange}
                    value={userFormData.name}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Your email"
                    name="email"
                    onChange={handleInputChange}
                    value={userFormData.email}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Your password"
                    name="password"
                    onChange={handleInputChange}
                    value={userFormData.password}
                    required
                />
            </Form.Group>
            <Button
                disabled={!(userFormData.email && userFormData.password)}
                type="submit"
                variant="success"
            >
                Submit
            </Button>
        </Form>
    )
     
}

export default Register;