import React from 'react';
import '../components/css/about.css';

function About() {
    return (
        <div className="about-container">
        <div className="about-info">
            <div className="about-name">About</div>
            <div className="about-email">
                Welcome to Earthify, the carbon tracking app that helps you reduce your environmental impact and support reforestation efforts worldwide. We believe that tracking your carbon footprint should be easy and accessible, and that everyone can make a difference by making simple changes in their daily lives.

                Our app calculates your personal carbon footprint based on your lifestyle choices, such as your transportation, diet, energy consumption, and shopping habits. By inputting data such as your daily commute, your household energy use, and the type and quantity of food you consume, our app provides you with an estimate of your carbon emissions and their impact on the environment.

                But we don't stop there. Instead of just telling you how much carbon you're emitting, we also show you how many trees you need to plant to offset your footprint. Trees are nature's carbon sinks, absorbing carbon dioxide from the atmosphere and turning it into oxygen and wood. By planting trees, you can help remove carbon from the atmosphere and support the restoration of degraded ecosystems.

                Our app uses a scientifically validated formula to calculate the number of trees you need to plant to offset your carbon footprint. This formula takes into account the type and size of trees, their location, and their growth rate, as well as your personal emissions data. We partner with reforestation organizations around the world to plant trees on your behalf, and we provide regular updates on the progress of your offsetting efforts.

                But we don't just track your carbon footprint and tree planting. We also offer tips and suggestions on how to reduce your emissions and live a more sustainable lifestyle. Whether it's switching to renewable energy, choosing plant-based foods, or using public transportation, we provide actionable advice that can help you make a positive impact on the environment.

                Join us in the fight against climate change and support reforestation efforts around the world. Download Earthify today and start tracking your carbon footprint and tree planting progress!</div>
        </div>
        </div>
    );
    };

export default About;