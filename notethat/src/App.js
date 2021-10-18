import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Mynotes from "./components/Mynotes";
import Home from "./components/Home";
import {PrivateRoute} from './components/PrivateRoute'
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <PrivateRoute path="/mynotes" component={Mynotes} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;
