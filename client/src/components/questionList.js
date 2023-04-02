import React, { useState } from "react";
import './css/questionList.css';

let questionData = [
    {
        title: "Question 1",
        description: "How many Kilowatt-hours (kWh) of electricty do you use in a month?",
        sample: "(e.g. 300)",
        type: "kilowattConsumption"
    },
    {
        title: "Question 2",
        description: "How much gas, in Litres (L), do you use in a month? ",
        sample: "(e.g. 125)",
        type: "consumptionType"
    },
    {
        title: "Question 3",
        description: "How many kilograms (kg) of meat do you consume in a month?",
        sample: "(e.g. 7)",
        type: "fuelAmount"
    }
]

function Questions() {
    const [count, setCount] = useState(0);
    const [kilowattConsumption, setKilowattConsumption] = useState("");
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
        
        setCount(count + 1);
        setKilowattConsumption("");
        setConsumptionType("");
        setFuelAmount("");
    };

    let questionNow = questionData[count];

    return (
        <form className="questionForm" onSubmit={handleSubmit}>
        <span className="questionTitle">{questionNow.title}</span>
        <p className="questionDescription">{questionNow.description}</p>
        <div>
            <input placeholder={questionNow.sample} type="text" name={questionData.type} id={questionData.type} value={kilowattConsumption} onChange={(event) => setKilowattConsumption(event.target.value)} />
            <button type="submit">Submit</button>
        </div>
    </form>
    );
}

export default Questions;
