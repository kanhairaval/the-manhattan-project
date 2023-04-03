import React, { useState, useEffect } from "react";
import {Form, Button, Alert} from "react-bootstrap";
import './css/login.css'
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useHistory } from "react-router-dom";

const Login = (props) => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertTimeoutId, setAlertTimeoutId] = useState(null);
    const history = useHistory();
    const[login] = useMutation(LOGIN_USER, {
        onCompleted: () => ({login : {token}}) => {
            localStorage.setItem('token', token);
            history.push('/')
        }
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...userFormData }
            });

            Auth.login(data.login.token);
        }
        catch (e) {
            setShowAlert(true);
            setAlertTimeoutId(setTimeout(() => setShowAlert(false), 3000));
        }
        setUserFormData({
            email: '',
            password: ''
        });
    };

    useEffect(() => {
        return () => {
            clearTimeout(alertTimeoutId);
        };
    }, [alertTimeoutId]);

    return (
        <div className="auth-form-container">
            <h2 className="loginTitle">Login</h2>
            {showAlert === true && (
                <Alert onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Email and/or Password are Incorrect!
                </Alert>
            )}
            <Form className="login-form" validated={validated} onSubmit={handleFormSubmit}>
                
                <Form.Group className="mb-b">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="
                        Enter email"
                        name="email"
                        onChange={handleInputChange}
                        value={userFormData.email}
                    />
                </Form.Group>
                
                <Form.Group className="mb-b">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleInputChange}
                        value={userFormData.password}
                    />
                </Form.Group>
                <Button
                className="registerBtn"
                disabled={!(userFormData.email && userFormData.password)}
                type="submit">
                Login</Button>
            </Form>
        </div>
    )
}

export default Login;