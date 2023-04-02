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

function Questions() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [kilowattConsumption, setKilowattConsumption] = useState("");
  const [consumptionType, setConsumptionType] = useState("");
  const [fuelAmount, setFuelAmount] = useState("");

  const currentQuestion = questionData[questionIndex];

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response;

    if (currentQuestion.type === "kilowattConsumption") {
      response = await fetch(`https://tracker-for-carbon-footprint-api.p.rapidapi.com/electricityToCO2e?kWh=${kilowattConsumption}`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "9c4f117a05mshc12c5f4b819c371p1f3d05jsnb17df03aee16",
          "X-RapidAPI-Host": "tracker-for-carbon-footprint-api.p.rapidapi.com",
        },
      });
      setKilowattConsumption("");
    } else if (currentQuestion.type === "consumptionType") {
      response = await fetch(`https://tracker-for-carbon-footprint-api.p.rapidapi.com/fuelToCO2e?type=${consumptionType}`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "9c4f117a05mshc12c5f4b819c371p1f3d05jsnb17df03aee16",
          "X-RapidAPI-Host": "tracker-for-carbon-footprint-api.p.rapidapi.com",
        },
      });
      setConsumptionType("");
    } else if (currentQuestion.type === "fuelAmount") {
      response = await fetch(`https://tracker-for-carbon-footprint-api.p.rapidapi.com/meatToCO2e?kg=${fuelAmount}`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "9c4f117a05mshc12c5f4b819c371p1f3d05jsnb17df03aee16",
          "X-RapidAPI-Host": "tracker-for-carbon-footprint-api.p.rapidapi.com",
        },
      });
      setFuelAmount("");
    }

    const data = await response.json();
    console.log(data);

    // If we're on the last question, reset back to the first question
    if (questionIndex === questionData.length - 1) {
      setQuestionIndex(0);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

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
