import React from "react";
import './css/questionList.css'

function Questions() {
    return (
    <form className="questionForm">
        <span className="questionTitle">Subscribe to our newsletter.</span>
        <p className="questionDescription">Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt dolore.</p>
        <div>
            <input placeholder="Enter your email" type="email" name="email" id="email-address" /> 
            <button type="submit">Subscribe</button>
        </div>
    </form>
    );
}

export default Questions;