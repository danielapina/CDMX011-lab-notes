import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/logo.png";

import { useAuth } from "../context/AuthContext";
import FormLogin from './FormLogin'


const Login = () => {
  const { login,loginGoogle } = useAuth();
  const [error, setError] = useState("");
  
  const history = useHistory();

  const handleLogin = async (email,pass) => {
try{
  await login(email,pass);
  console.log("inicieeee sesionnn");
  history.push("/mynotes");
}catch(error){
  setError("Wrong credentials,try again.");
  console.log(error);
  console.log("hay un errorrrrr");
}
  };

  const handleGoogle = async () => {
  try{
    await loginGoogle()
    console.log('login google')
    history.push('/mynotes')
  }catch(error){
console.log(error)
  }
  };

  return (
    <div className="container">
      <div className="header">
        <Link to="/">
          <img src={logo} alt="logo" className="logotype" />
        </Link>
      </div>
      <div className="form-title">
        <h1 className="title">Log In!</h1>
        <p className="slogan">
          Hurry don't forget <span className="that-span">that</span> idea
        </p>
        {error && <p className="error">{error}</p>}
      </div>
      <FormLogin handleLogin={handleLogin} handleGoogle={handleGoogle}/>
      <p className="link-to">
        Don't have an account yet?{" "}
        <Link to="/register" className="links">
          Sign Up
        </Link>
      </p>
    </div>
  );
};
export default Login;
