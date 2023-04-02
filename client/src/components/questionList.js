import React, { useState } from "react";
import './css/questionList.css';

function Questions() {
    const [location, setLocation] = useState("");
    const [consumptionType, setConsumptionType] = useState("");
    const [fuelAmount, setFuelAmount] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const encodedParams = new URLSearchParams();
        encodedParams.append("type", consumptionType);
        encodedParams.append("litres", fuelAmount);

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '9c4f117a05mshc12c5f4b819c371p1f3d05jsnb17df03aee16',
                'X-RapidAPI-Host': 'tracker-for-carbon-footprint-api.p.rapidapi.com'
            },
            body: encodedParams
        };

        fetch('https://tracker-for-carbon-footprint-api.p.rapidapi.com/fuelToCO2e', options)
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
                <input placeholder="Enter your consumption type" type="text" name="consumptionType" id="consumptionType" value={consumptionType} onChange={(event) => setConsumptionType(event.target.value)} />
                <input placeholder="Enter your fuel amount" type="text" name="fuelAmount" id="fuelAmount" value={fuelAmount} onChange={(event) => setFuelAmount(event.target.value)} />
                <button type="submit">Subscribe</button>
            </div>
        </form>
    );
}

export default Questions;
