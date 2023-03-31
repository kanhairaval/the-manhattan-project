import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Login from '../components/Login';
import Register from "../components/Register";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to My MERN SPA!</h1>
      <h2 className="text-2xl mb-8">This is the home page.</h2>
      <Routes>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Routes>
    </div>
  );
}

export default HomePage;