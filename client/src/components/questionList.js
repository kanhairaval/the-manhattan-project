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
  const [fuelType, setFuelType] = useState("");
  const [fuelAmount, setFuelAmount] = useState("");
  const [trees, setTrees] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response;

async function convertConsumptionToCO2(consumption) {
  const kgCO2 = consumption * 19.22;
  return parseFloat(kgCO2.toFixed(1));
}

async function convertFuelToCO2(fuelType, fuelAmount) {
  const body = {
    type: fuelType,
    litres: fuelAmount,
  };
  response = await fetch(
    `https://tracker-for-carbon-footprint-api.p.rapidapi.com/fuelToCO2e`,
    {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": "9c4f117a05mshc12c5f4b819c371p1f3d05jsnb17df03aee16",
        "X-RapidAPI-Host": "tracker-for-carbon-footprint-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const data = await response.json();
  return parseFloat(data.carbon.split(" ")[0]);
}

async function convertHydroToCO2(consumption) {
  const data = { consumption: consumption, location: "Canada" };
  response = await fetch(
    `https://tracker-for-carbon-footprint-api.p.rapidapi.com/traditionalHydro`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "9c4f117a05mshc12c5f4b819c371p1f3d05jsnb17df03aee16",
      },
      body: JSON.stringify(data),
    }
  );
  const jsonData = await response.json();
  return parseFloat(jsonData.carbon.split(" ")[0]);
}

let co2e;

switch (questionData[questionIndex].type) {
  case "kilowattConsumption":
    co2e = await convertConsumptionToCO2(kilowattConsumption);
    break;
  case "consumptionType":
    co2e = await convertFuelToCO2(consumptionType, fuelAmount);
    break;
  case "fuelAmount":
    if (fuelType === "hydro") {
        co2e = await convertHydroToCO2(fuelAmount);
    } else {
        co2e = await convertFuelToCO2(fuelType, fuelAmount);
    } // end if
    break;
    default:
    break;
}  // end switch
const handleNextQuestion = () => {
    if (questionIndex === questionData.length - 1) {
    // if the current question is the last question, calculate the total CO2 emissions and trees needed
    let totalCO2e = 0;
    for (let i = 0; i < questionData.length; i++) {
    switch (questionData[i].type) {
    case "kilowattConsumption":
    totalCO2e += convertConsumptionToCO2(kilowattConsumption);
    break;
    case "consumptionType":
    totalCO2e += convertFuelToCO2(consumptionType, fuelAmount);
    break;
    case "fuelAmount":
    if (fuelType === "hydro") {
    totalCO2e += convertHydroToCO2(fuelAmount);
    } else {
    totalCO2e += convertFuelToCO2(fuelType, fuelAmount);
    }
    break;
    default:
    break;
    }
    }
    // convert CO2 emissions to number of trees needed
    const treesNeeded = Math.ceil(totalCO2e / 21.77);
    setTrees(treesNeeded);
    setQuestionIndex(0);
    } else {
    // if the current question is not the last question, move on to the next question
    setQuestionIndex(questionIndex + 1);
    }
    };
    const handleBackQuestion = () => {
        if (questionIndex === 0) {
        setQuestionIndex(questionData.length - 1);
        } else {
        setQuestionIndex(questionIndex - 1);
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
};


export default Questions;
