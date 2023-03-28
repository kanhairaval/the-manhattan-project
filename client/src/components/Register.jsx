import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');  
    
    const handleSubmit = () => {
        e.preventDefault();
        console.log(email);
    }
    return (
        <div className="auth-form-container">
            <h2>Regisger</h2>
        <Form className="register-form"onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" id="name" placeholder="full Name" />
         <label htmlFor="email">email</label>
         <input value={email} onchange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@email.com" id="email" name="email"/>
         <label htmlFor="password">password</label>
         <input value={pass} onchange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password"/>
         <button type="submit">Log-in</button>
         </Form>
         <button className="link-btn" onClick={() => props.onFormSwitch("login")}>Already have an account? Login here!</button>
     </div>
    )
     
    }