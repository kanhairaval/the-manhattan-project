import React, { useState } from "react";
import './css/questionList.css';

function Questions() {
    const [location, setLocation] = useState("");
    const [consumption, setConsumption] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const encodedParams = new URLSearchParams();
        encodedParams.append("consumption", consumption);
        encodedParams.append("location", location);

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '9c4f117a05mshc12c5f4b819c371p1f3d05jsnb17df03aee16',
                'X-RapidAPI-Host': 'tracker-for-carbon-footprint-api.p.rapidapi.com'
            },
            body: encodedParams
        };

        fetch('https://tracker-for-carbon-footprint-api.p.rapidapi.com/traditionalHydro', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    };

    return (
        <form className="questionForm" onSubmit={handleSubmit}>
            <span className="questionTitle">Subscribe to our newsletter.</span>
            <p className="questionDescription">Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt dolore.</p>
            <div>
                <input placeholder="Enter your location" type="text" name="location" id="location" value={location} onChange={(event) => setLocation(event.target.value)} /> 
                <input placeholder="Enter your consumption" type="text" name="consumption" id="consumption" value={consumption} onChange={(event) => setConsumption(event.target.value)} />
                <button type="submit">Subscribe</button>
            </div>
        </form>
    );
}

export default Questions;
