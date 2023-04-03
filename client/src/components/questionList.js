import React, { useState } from "react";
import './css/questionList.css';
import { useMutation } from "@apollo/client";
import { SAVE_SCORE } from "../utils/mutations";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    const [meatConsumption, setMeatConsumption] = useState("");
    const [saveScore] = useMutation(SAVE_SCORE, {
      update(cache, { data: { saveScore } }) {
        try {
          cache.writeQuery({
            query: SAVE_SCORE,
            data: { saveScore: saveScore },
          });
        } catch (e) {
          console.error(e);
        }
      }
    });
  
    const currentQuestion = questionData[currentQuestionIndex];
  
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
                  "x-rapidapi-key": "70b074e296msh06923312155a421p1e4ea3jsn6fa478ec4b8f",
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
              "https://tracker-for-carbon-footprint-api.p.rapidapi.com/fuelToCO2e?rapidapi-key=70b074e296msh06923312155a421p1e4ea3jsn6fa478ec4b8f",
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
          console.log(showResults);
          setShowResults(true);
          currentQuestion.title = "Your Results";
          currentQuestion.description = `Based on your carbon footprint of ${co2kg} Kg CO2 emissions, you would need to plant ${Math.ceil(trees)} trees to offset your emissions.`;
        } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        console.log(currentQuestionIndex);
        console.log(questionData);
        }
      };     
  
      const handleSaveScore = async (event) => {
        event.preventDefault();

        try {
          await saveScore({
            variables: { score: questionData[currentQuestionIndex].type },
          });
        } catch (e) {
          console.error(e);
        }
      };

      const reloadPage = (event) => {
        window.location.reload();
      }

  return (
    /* Display the current question */
    <Container className="questionSection">    
    <section>
    <Row>
    <Col>
      <h3 id="aboutUs">Personal Carbon Footprint Calculator</h3>
      <div ></div>
      <p>
      Our company is dedicated to helping people reduce their carbon footprint and create a more sustainable future for our planet. 
      Our interactive carbon footprint calculator will guide you through a few questions about your energy and resource consumption habits, providing you with an estimate of your carbon emissions. 
      The calculator then recommends actions you can take to reduce your carbon footprint and offset your emissions through tree planting. 
      Our platform utilizes APIs to calculate carbon emissions based on kilowatt-hours of electricity, fuel consumption, and meat consumption. 
      Our team is committed to using technology to promote environmental sustainability and encourage positive changes in behavior to protect our planet for generations to come. 
      Join us in our mission to create a more sustainable world.
      </p>
    </Col>
    <Col className="formAlign">
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
        {showResults === true && ( <button type="submit" onClick={reloadPage}>Recalculate</button> )}
        {showResults === true && ( <button type="submit"onClick={handleSaveScore}>Save Score</button> )}
      </div>
    </form>
    </Col>
    </Row>
    </section>

    <div className="logo">
      <img
        style={{ width: "300px"}} 
        alt="logo" 
        src={require('../images/logo.png')}/>
    </div>
    </Container>
  );
}

export default Questions;