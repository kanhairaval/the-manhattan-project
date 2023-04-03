import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from '../components/Login';
import Register from "../components/Register";
import "./App.css"; // import css file

// import { Link } from 'react-router-dom'; // add this line for link "about"

function HomePage() {
  return (
    <div className="">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
                      <h3 className="main-hander">Earthify</h3>
                      <div className="underlne mx auto"></div>
                      <p>An environment calculator is a tool that enables individuals and businesses to measure their environmental impact. It allows users to input data such as energy consumption, waste generation, and transportation emissions, and then calculates the carbon footprint and other environmental metrics associated with these activities. This information can be used to identify areas where improvements can be made to reduce environmental impact and promote sustainability. The environment calculator is an important tool in the fight against climate change and the promotion of eco-friendly practices.</p>
                      <Link to="/about" className="btn btn-warning shadow">Read More</Link>
                      <div>
                      </div>
                   </div>
                </div>
             </div>
      </section>
      {/*Our vision, mission and values*/}
       <div className="about-container">
        <div className="about-info">
            <div className="about-name">About</div>
            <div className="underlne 2 mx auto"></div>
            <div className="about-email">
                Welcome to Earthify, the carbon tracking app that helps you reduce your environmental impact and support reforestation efforts worldwide. We believe that tracking your carbon footprint should be easy and accessible, and that everyone can make a difference by making simple changes in their daily lives.

                Our app calculates your personal carbon footprint based on your lifestyle choices, such as your transportation, diet, energy consumption, and shopping habits. By inputting data such as your daily commute, your household energy use, and the type and quantity of food you consume, our app provides you with an estimate of your carbon emissions and their impact on the environment.

                But we don't stop there. Instead of just telling you how much carbon you're emitting, we also show you how many trees you need to plant to offset your footprint. Trees are nature's carbon sinks, absorbing carbon dioxide from the atmosphere and turning it into oxygen and wood. By planting trees, you can help remove carbon from the atmosphere and support the restoration of degraded ecosystems.

                Our app uses a scientifically validated formula to calculate the number of trees you need to plant to offset your carbon footprint. This formula takes into account the type and size of trees, their location, and their growth rate, as well as your personal emissions data. We partner with reforestation organizations around the world to plant trees on your behalf, and we provide regular updates on the progress of your offsetting efforts.

                But we don't just track your carbon footprint and tree planting. We also offer tips and suggestions on how to reduce your emissions and live a more sustainable lifestyle. Whether it's switching to renewable energy, choosing plant-based foods, or using public transportation, we provide actionable advice that can help you make a positive impact on the environment.

                Join us in the fight against climate change and support reforestation efforts around the world. Download Earthify today and start tracking your carbon footprint and tree planting progress!</div>
        </div>
        </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </div>
  );
}

export default HomePage; 