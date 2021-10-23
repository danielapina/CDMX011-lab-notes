import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Mynotes from "./components/Mynotes";
import Home from "./components/Home";
import {PrivateRoute} from './components/PrivateRoute'
import { AuthProvider } from "./context/AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,signOut
} from "firebase/auth";
import {auth} from './firebaseconfig'

function App() {
  return (
    <AuthProvider
    auth={auth}
    signInWithEmailAndPassword={signInWithEmailAndPassword}
    createUserWithEmailAndPassword={createUserWithEmailAndPassword}
    onAuthStateChanged={onAuthStateChanged}
    signOut={signOut}
    >
     <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <PrivateRoute path="/mynotes" component={Mynotes} />
          </Switch>
     </Router>
    </AuthProvider>
  );
}
export default App;
