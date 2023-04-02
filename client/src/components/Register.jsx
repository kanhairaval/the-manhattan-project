import { React, useState } from "react";
import {Form, Button} from "react-bootstrap";
import './css/register.css'
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
//import { signupUser } from "../utils/API";
import Auth from "../utils/auth";


const Register = () => {
    const [userFormData, setuserFormData] = useState({
        name: '',
        email: '',
        password: '',
      });
      const [addProfile, { error, data }] = useMutation(ADD_USER);
    
      // update state based on form input changes
      const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setuserFormData({
          ...userFormData,
          [name]: value,
        });
      };
    
      // submit form
      const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(userFormData);
    
        try {
          const { data } = await addProfile({
            variables: { ...userFormData },
          });
    
          Auth.login(data.addProfile.token);
        } catch (e) {
          console.error(e);
        }
      };

    return (
        <div className="auth-form-container">
            <h2 className="registerTitle">Register</h2>
        <Form className="register-form" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-b">
                <Form.Label htmlFor="name">Full Name</Form.Label>
                <Form.Control
                    type="name"
                    placeholder="Enter Full Name"
                    name="name"
                    onChange={handleInputChange}
                    value={userFormData.name}
                />

            </Form.Group>
            <Form.Group className="mb-b">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleInputChange}
                    value={userFormData.email}
                />
            </Form.Group>
            <Form.Group className="mb-b">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    onChange={handleInputChange}
                    value={userFormData.password}
                />
            </Form.Group>
            <Button
                className="btn d-block w-100"
                disabled={!(userFormData.email && userFormData.password)}
                type="submit"
            >
                Submit
            </Button>
        </Form>
    </div>
    )
}

export default Register;