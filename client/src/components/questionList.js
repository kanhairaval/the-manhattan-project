import React, { useEffect, useState } from "react";
import './css/questionList.css'

function Questions() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const encodedParams = new URLSearchParams();
        encodedParams.append("consumption", "250");
        encodedParams.append("location", "Canada");

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
            .then(response => setData(response))
            .catch(err => console.error(err));
    }, []);

    return (
    <form className="questionForm">
        <span className="questionTitle">Subscribe to our newsletter.</span>
        <p className="questionDescription">Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt dolore.</p>
        <div>
            <input placeholder="Enter your email" type="email" name="email" id="email-address" /> 
            <button type="submit">Subscribe</button>
        </div>
        {data && <p>Consumption: {data.consumption}, Location: {data.location}</p>}
    </form>
    );
}

export default Questions;