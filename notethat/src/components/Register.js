import "./styles/Register.css";
import logo from "../assets/logo.png";

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import FormRegister from "./FormRegister";

import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { signup, loginGoogle } = useAuth();
  const [error, setError] = useState("");

  const history = useHistory();

  const handleRegister = async (email, pass, confirmPass) => {
    if (pass !== confirmPass) {
      setError("Passwords do not match");
    } else {
      try {
        await signup(email, pass);
        console.log("me registreee");
        history.push("/mynotes");
      } catch (error) {
        setError("Wrong credentials,try again.");
        console.log(error);
        console.log("hay un errorrrrr");
        setTimeout(()=>setError(''),2500)
      }
    }
  };

  const handleGoogle = async () => {
    try {
      await loginGoogle();
      history.push("/mynotes");
      console.log("google");
    } catch (error) {
      console.log("hay un error en google");
      setError("Wrong credentials,try again.");
      console.log(error);
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
        <h1 className="title">Sign Up!</h1>
        <p className="slogan">
          Start saving <span className="that-span">that</span> idea
        </p>
        {error && <p className="error">{error}</p>}
      </div>
      <FormRegister
        handleRegister={handleRegister}
        handleGoogle={handleGoogle}
      />

      <p className="link-to">
        Already have an account?{" "}
        <Link to="/login" className="links">
          Log In
        </Link>
      </p>
    </div>
  );
};
export default Register;
