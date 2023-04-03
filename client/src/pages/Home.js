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
              <div/>
                      <h3 className="main-hander">Earthify</h3>
                      <div className="underlne mx auto"></div>
                      <p> ya mum</p>
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