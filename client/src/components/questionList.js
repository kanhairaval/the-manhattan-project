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
    type: "fuelConsumption",
  },
  {
    title: "Question 3",
    description: "How many kilograms (kg) of meat do you consume in a month?",
    sample: "(e.g. 7)",
    type: "meatConsumption",
  },
];

function Questions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [kilowattConsumption, setKilowattConsumption] = useState("");

  const currentQuestion = questionData[currentQuestionIndex];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make the API request with the user's input
    const response = await fetch("https://tracker-for-carbon-footprint-api.p.rapidapi.com/traditionalHydro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": "9c4f117a05mshc12c5f4b819c371p1f3d05jsnb17df03aee16",
        "x-rapidapi-host": "tracker-for-carbon-footprint-api.p.rapidapi.com"
      },
      body: JSON.stringify({
        "consumption": kilowattConsumption,
        "location": "Canada"
      })
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    /* Display the current question */
    <form className="questionForm" onSubmit={handleSubmit}>
      <span className="questionTitle">{currentQuestion.title}</span>
      <p className="questionDescription">{currentQuestion.description}</p>
      <div>
        {currentQuestion.type === "kilowattConsumption" && (
          <input
            placeholder={currentQuestion.sample}
            type="text"
            value={kilowattConsumption}
            onChange={(event) =>
              setKilowattConsumption(event.target.value)
            }
          />
        )}
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default Questions;
