import React, {useState} from 'react'
import line from "../assets/line-form.png";
import google from "../assets/google.png";

 const FormLogin = ({handleLogin,handleGoogle}) => {
    const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

    return (
        <div className="form-content">
        <h4>Email</h4>
        <input
          type="text" required placeholder="example@example.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <h4>Password</h4>
        <input
          type="password" required placeholder="Your Password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        
        <button
          className="btn-register"
          onClick={() => {
            handleLogin(email, pass);
          }}
        >
          Log In
        </button>
        <img src={line} alt="line-form" className="line-form" />
        <div className="social-buttons">
         
          <button className="btn-google" onClick={handleGoogle}>
            <img src={google} alt="google-logo" className="google-logo" />
            Continue With Google
          </button>
        </div>
        </div>
    )
}

export default FormLogin;

