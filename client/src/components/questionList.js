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

async function convertConsumptionToCO2(consumption) {
    const kgCO2 = consumption * 19.22;
    const carbon = `${kgCO2.toFixed(1)} kg co2`;
    const success = true;
    return { carbon, success };
  }
  
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
        const data = { consumption: kilowattConsumption, location: "Canada" };
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
        const carbon = result.carbon.split("")[0];
        const trees = (parseFloat(carbon) / 100) * 1.7; // calculate the number of trees needed to offset emissions
        console.log(trees);
      } else if (currentQuestion.type === "consumptionType") {
        const result = await convertConsumptionToCO2(consumptionType);
        setCarbon(result.carbon);
        setSuccess(result.success);
        setConsumptionType("");
        const carbon = result.carbon.split(" ")[0];
        const trees = (parseFloat(carbon) / 100) * 1.7; // calculate the number of trees needed to offset emissions
        console.log(trees);
      } else if (currentQuestion.type === "fuelAmount") {
        const body = {
          "type": fuelType,
          "litres": fuelAmount
        }
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
        const carbon = data.carbon.split(' ')[0]; // get the first index value of carbon
        const trees = (parseFloat(carbon) / 100) * 1.7; // calculate the number of trees needed to offset emissions
        console.log(trees);
      }
      
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
