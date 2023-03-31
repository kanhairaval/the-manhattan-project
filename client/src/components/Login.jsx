import React, { useState } from "react";
// import { Register } from "./Register";
import {Form, Button, Alert} from "react-bootstrap";
// import { useMutation } from "@apollo/client";
import { loginUser } from "../utils/mutations";
import loginUserAuth from "../utils/auth";

function Login ()  {
    const [userFormData, setUserFormData] = useState({email: '', password: ''});
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
            const response = await loginUser(userFormData);
            if (!response.ok) {
                throw new Error('something went wrong!');
            }
            const { token, user } = await response.json();
            console.log(user);
            loginUserAuth.login(token);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }
        setUserFormData({
            email: '',
            password: ''
        });
    };
    
    return (
        <div className="auth-form-container">
            <h2>Login</h2>
       <Form className="Login-form"onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input value={email} onchange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@email.com" id="email" name="email"/>
        <label htmlFor="password">password</label>
        <input value={pass} onchange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password"/>
        <button type="submit">Log-in</button>
        </Form>
        <button className="link-btn" onClick={() => props.onFormSwitch("Register")}>Dont have an account? Register here!</button>
         </div>

    )
}

export default Login;