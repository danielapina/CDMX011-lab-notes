import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Mynotes from './components/Mynotes';
import Home from './components/Home';

function App() {
  return (
    <Router>
    <div className="contaier">
      <h1>Nav Bar...</h1>
      <div className="btn-group">
         <Link to="/">
         Home
         </Link>
         <Link to="/login">
         Log In
         </Link>
         <Link to="/signup">
         Sign Up
         </Link>
         <Link to="/mynotes">
         My Notes
         </Link>
      </div>
      <hr/>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/mynotes">
          <Mynotes />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
