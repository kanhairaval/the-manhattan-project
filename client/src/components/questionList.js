import React, { useState } from "react";
import './css/questionList.css';

const questionData = [
  {
    title: "Question 1",
    description: "How many Kilowatt-hours (kWh) of electricity do you use in a month?",
    sample: "(e.g. 300)",
    type: "kilowattConsumption",
  },
  {
    title: "Question 2",
    description: "How much gas, in Litres (L), do you use in a month? ",
    sample: "(e.g. 125)",
    type: "consumptionType",
  },
  {
    title: "Question 3",
    description: "How many kilograms (kg) of meat do you consume in a month?",
    sample: "(e.g. 7)",
    type: "fuelAmount",
  },
];
  
import { useState } from "react";

import { useState } from "react";

function Questions() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [kilowattConsumption, setKilowattConsumption] = useState("");
  const [consumptionType, setConsumptionType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [fuelAmount, setFuelAmount] = useState("");
  const [trees, setTrees] = useState(0);

  const questionData = [
    { type: "kilowattConsumption", text: "What is your average monthly electricity consumption in kilowatt-hours?" },
    { type: "consumptionType", text: "What type of energy are you using? Please input 1 for Natural Gas, 2 for Oil, 3 for Propane, or 4 for Wood." },
    { type: "fuelAmount", text: "How many litres of fuel have you used in the past month?" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response;

    async function convertConsumptionToCO2(consumption) {
      const kgCO2 = consumption * 19.22;
      return parseFloat(kgCO2.toFixed(1));
    }

    async function convertFuelToCO2(fuelType, fuelAmount) {
      const body = {
        "type": fuelType,
        "litres": fuelAmount
      };
      response = await fetch(`https://tracker-for-carbon-footprint-api.p.rapidapi.com/fuelToCO2e`, {
        method: "POST",
        headers: {
          "X-RapidAPI-Key": "9c4f117a05mshc12c5f4b819c371p1f3d05jsnb17df03aee16",
          "X-RapidAPI-Host": "tracker-for-carbon-footprint-api.p.rapidapi.com",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      return parseFloat(data.carbon.split(' ')[0]);
    }

    async function convertHydroToCO2(consumption) {
      const data = { consumption: consumption, location: "Canada" };
      response = await fetch(`https://tracker-for-carbon-footprint-api.p.rapidapi.com/traditionalHydro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": "9c4f117a05mshc12c5f4b819c371p1f3d05jsnb17df03aee16",
          "X-RapidAPI-Host": "tracker-for-carbon-footprint-api.p.rapidapi.com",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return parseFloat(result.carbon.split(" ")[0]);
    }

    if (questionIndex === 0) {
      const kgCO2 = await convertHydroToCO2(kilowattConsumption);
      setTrees(parseFloat((kgCO2 / 100) * 1.7).toFixed(1));
    } else if (questionIndex === 1) {
      const kgCO2 = await convertConsumptionToCO2(consumptionType);
      setTrees(parseFloat((kgCO2 / 100) * 1.7).toFixed(1));
    } else if (questionIndex === 2) {
      const kgCO2 = await convertFuelToCO2(fuelType, fuelAmount);
        setTrees(parseFloat((kgCO2 / 100) * 1.7).toFixed(1));
    } else {
        setTrees(0);
    }

    return (
    /* Display the current question */
    <form className="questionForm" onSubmit={handleSubmit}>
        <span className="questionTitle">{currentQuestion.title}</span>
        <p className="questionDescription">{currentQuestion.description}</p>
        <div>
            {currentQuestion.type === "kilowattConsumption" && (
                <input placeholder={currentQuestion.sample} type="text" value={kilowattConsumption} onChange={(event) => setKilowattConsumption(event.target.value)} />
            )}
            {currentQuestion.type === "consumptionType" && (
                <input placeholder={currentQuestion.sample} type="text" value={consumptionType} onChange={(event) => setConsumptionType(event.target.value)} />
            )}
            {currentQuestion.type === "fuelAmount" && (
                <input placeholder={currentQuestion.sample} type="text" value={fuelAmount} onChange={(event) => setFuelAmount(event.target.value)} />
            )}
            <button type="submit">Submit</button>
        </div>
    </form>
    );
}

export default Questions;
