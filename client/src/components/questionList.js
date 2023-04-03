import React, { useState } from "react";
import './css/questionList.css';
import { useMutation } from "@apollo/client";
import { SAVE_SCORE } from "../utils/mutations";

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
    const [showResults, setShowResults] = useState(false);
    const [kilowattConsumption, setKilowattConsumption] = useState("");
    const [fuelConsumption, setFuelConsumption] = useState("");
    const [addScore, { error, data }] = useMutation(SAVE_SCORE);
  
    const currentQuestion = questionData[currentQuestionIndex];
  
    const [meatConsumption, setMeatConsumption] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        let co2kg = 0;
      
        // Calculate CO2 Kg values for all questions
        try {
          // Question 1 - kilowattConsumption
          if (questionData[currentQuestionIndex].type === "kilowattConsumption") {
            const response = await fetch(
              "https://tracker-for-carbon-footprint-api.p.rapidapi.com/traditionalHydro",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-rapidapi-host": "tracker-for-carbon-footprint-api.p.rapidapi.com",
                  "x-rapidapi-key": "6b035cb9d9mshf6a8a37c35a7c76p1f7aa3jsnddcf12226516",
                },
                body: JSON.stringify({
                  consumption: kilowattConsumption,
                  location: "Canada",
                }),
              }
            );
      
            const data = await response.json();
      
            if (data.success) {
              co2kg += parseFloat(data.carbon.split(" ")[0]);
            } else {
              console.error("API call failed");
            }
          }
          // Question 2 - fuelConsumption
          else if (questionData[currentQuestionIndex].type === "fuelConsumption") {
            const response = await fetch(
              "https://tracker-for-carbon-footprint-api.p.rapidapi.com/fuelToCO2e?rapidapi-key=6b035cb9d9mshf6a8a37c35a7c76p1f7aa3jsnddcf12226516",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  type: "Petrol",
                  litres: fuelConsumption,
                }),
              }
            );
      
            const data = await response.json();
      
            if (data.success) {
              co2kg += parseFloat(data.carbon.split(" ")[0]);
            } else {
              console.error("API call failed");
            }
          }
          // Question 3 - meatConsumption
          else if (questionData[currentQuestionIndex].type === "meatConsumption") {
            co2kg += parseFloat((meatConsumption * 19.22).toFixed(2));
          }
        } catch (error) {
          console.error("Error fetching data from API:", error);
        }
      
        console.log("CO2 Kg value:", co2kg);
      
        // Calculate trees needed to offset CO2 Kg value
        const trees = (co2kg / 100) * 1.7;
        console.log("Trees needed:", trees);
      
        if (currentQuestionIndex === questionData.length - 1) {
          setShowResults(true);
          currentQuestion.title = "Your Results";
          currentQuestion.description = `Based on your carbon footprint of ${co2kg} Kg CO2 emissions, you would need to plant ${Math.ceil(trees)} trees to offset your emissions.`;
        } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        return trees;
      };     

      const handleSaveScore = async (event) => {
        event.preventDefault();
        const trees = await handleSubmit(event);
        try {
          const { data } = await addScore({
            variables: { score: trees },
          });
          console.log(data);
        } catch (err) {
          console.error(err);
        }
        window.location.href = "/profile";
      };



  return (
    /* Display the current question */
    <section className="questionSection">
    <form className="questionForm" onSubmit={handleSubmit}>
      <span className="questionTitle">{currentQuestion.title}</span>
      <p className="questionDescription">{currentQuestion.description}</p>
      <div>
        {currentQuestion.type === "kilowattConsumption" && showResults === false && (
          <input
            placeholder={currentQuestion.sample}
            type="text"
            value={kilowattConsumption}
            onChange={(event) =>
              setKilowattConsumption(event.target.value)
            }
          />
        )}
        {currentQuestion.type === "fuelConsumption" && showResults === false && (
          <input
            placeholder={currentQuestion.sample}
            type="text"
            value={fuelConsumption}
            onChange={(event) =>
              setFuelConsumption(event.target.value)
            }
          />
        )}
        {currentQuestion.type === "meatConsumption" && showResults === false && (
          <input
            placeholder={currentQuestion.sample}
            type="text"
            value={meatConsumption}
            onChange={(event) =>
              setMeatConsumption(event.target.value)
            }
          />
        )}
        {showResults === false && ( <button type="submit">Submit</button> )}
        {showResults === true && ( <button type="submit">Recalculate</button> )}
        {showResults === true && ( <button type="submit" onClick={handleSaveScore}>Save Score</button> )}
      </div>
    </form>
    </section>
  );
}

export default Questions;
