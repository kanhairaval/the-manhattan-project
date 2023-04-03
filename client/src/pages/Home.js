import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/Login';
import Register from "../components/Register";
import "../app.css"; // import css file
// import { Link } from 'react-router-dom'; // add this line for link "about"

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to My MERN SPA!</h1>
      <h2 className="text-2xl mb-8">This is the home page.</h2>
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
                      {/* <link to="/about" className="btn btn-warning shadow">Read More</link> */}
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