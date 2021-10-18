import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles/Login.css";
import logo from "../assets/logo.png";
import line from "../assets/line-form.png";
import facebook from "../assets/facebook.png";
import google from "../assets/google.png";
import { useAuth } from "../context/AuthContext";


const Login = () => {
  const { login,loginGoogle } = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();

  const handleLogin = () => {
    login(email, pass)
      .then(() => {
        console.log("inicieeee sesionnn");
        history.push("/mynotes");
      })
      .catch((error) => {
        setError("Wrong credentials,try again.");
        console.log(error);
        console.log("hay un errorrrrr");
      });
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
        <h1 className="title">Log In </h1>
        <p className="slogan">
          Hurry don't forget <span className="that-span">that</span> idea
        </p>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="form-content">
        <h4>Email</h4>
        <input
          type="text" required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <h4>Password</h4>
        <input
          type="password" required
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />

        <button
          className="btn-login"
          onClick={() => {
            handleLogin(email, pass);
          }}
        >
          Log In
        </button>
        <img src={line} alt="line-form" className="line-form" />
        <div className="social-buttons">
          <button className="btn-facebook">
            <img src={facebook} alt="facebook-logo" className="facebook-logo" />
            Facebbok
          </button>
          <button className="btn-google" onClick={handleGoogle}>
            <img src={google} alt="google-logo" className="google-logo" />
            Google
          </button>
        </div>
      </div>
      <p>
        Don't have an account yet?{" "}
        <Link to="/register" className="links">
          Sign Up
        </Link>
      </p>
    </div>
  );
};
export default Login;
