import React, { useState } from "react";
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
            console.error(e);
        }
        setUserFormData({
            email: '',
            password: ''
        });
    };
    
    return (
        <div className="auth-form-container">
            <h2 className="loginTitle">Login</h2>
            <Form className="login-form" validated={validated} onSubmit={handleFormSubmit}>
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Something went wrong with your login credentials!
            </Alert>
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
            {/* <button className="link-btn" onClick={() => props.onFormSwitch("Register")}>Dont have an account? Register here!</button> */}
        </div>
    )
}

export default Login;