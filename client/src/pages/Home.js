import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from '../components/Login';
import Register from "../components/Register";
import "./App.css"; // import css file

// import { Link } from 'react-router-dom'; // add this line for link "about"

function HomePage() {
  return (
    <div className="homeBody">
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

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </div>
  );
}

export default HomePage; 