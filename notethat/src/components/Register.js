import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles/Register.css";
import logo from "../assets/logo.png";
import line from "../assets/line-form.png";
import google from "../assets/google.png";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { signup,loginGoogle } = useAuth();
  const [error, setError]=useState('');
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const history = useHistory();

  const handleRegister = () => {
    if(pass !== confirmPass){
      setError('Passwords do not match');
    }else{
      signup(email, pass)
      .then(() => {
        console.log("me registreee");
        history.push("/mynotes");
      })
      .catch((error) => {
        setError('Wrong credentials,try again.')
        console.log(error);
        console.log("hay un errorrrrr");
      });
    }
  };

  const handleGoogle = async () => {
    try{
await loginGoogle();
history.push('/mynotes')
console.log('google')
    }catch (error){
      console.log('hay un error en google')
      setError('Wrong credentials,try again.')
      console.log(error);
    } 
  };

  

  return (
    <div className="container">
      <div className="header">
      <Link to="/"><img src={logo} alt="logo" className="logotype" /></Link>
      </div>
      <div className="form-title">
        <h1 className="title">Sign Up</h1>
        <p className="slogan">
          Start saving <span className="that-span">that</span> idea
        </p>
        {error && <p className='error'>{error}</p>}
      </div>
      <div className="form-content">
        <h4>Name</h4>
        <input type="text" />
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
        <h4>Confirm Password</h4>
        <input type="password" onChange={(e) => {
            setConfirmPass(e.target.value);
          }}/>
        <button
          className="btn-register"
          onClick={() => {
            handleRegister(email, pass,confirmPass);
          }}  
        >
          Sign Up
        </button>
        <img src={line} alt="line-form" className="line-form" />
        <div className="social-buttons">
          <button className="btn-google"  onClick={handleGoogle} >
            <img src={google} alt="google-logo" className="google-logo"  />
           Continue With Google
          </button>
        </div>
      </div>

      <p className="link-to">
        Already have an account? <Link to="/login" className="links">Log In</Link>
      </p>
    </div>
  );
};
export default Register;
