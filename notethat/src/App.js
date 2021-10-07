import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch,  Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Mynotes from "./components/Mynotes";
import Home from "./components/Home";
import {AuthProvider} from './context/AuthContext'

function App() {
  
  
  return (
    <AuthProvider>
    <Router>
    <div>
      <Switch>
      <Route exact path='/' component={Home}></Route>
        <Route path='/register'><Register /></Route>
        <Route path='/login'><Login /></Route>
        <Route path='/mynotes' component={Mynotes}></Route>
        
      </Switch>
    </div>
  </Router>
  </AuthProvider>
  );
}
export default App;