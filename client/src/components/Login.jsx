import React, { useState } from "react";
// import { Register } from "./Register";
import {Form} from "react-bootstrap";
// import { useMutation } from "@apollo/client";
// import { LOGIN_USER } from "../utils/mutations";
// import Auth from "../utils/auth";
import './css/login.css'

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);

    }
    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <Form className="login-form" onSubmit={handleSubmit}>
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