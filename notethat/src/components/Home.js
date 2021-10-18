import React from "react";
import "./styles/Home.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import noteThat from "../assets/that-idea.png";
import postIt from "../assets/post-it.png";
import byePaper from "../assets/bye-paper.png";
import feather from "../assets/logo-feather.png";

function Home() {
  return (
    <div className="container-home">
    <div className="header-home">
        <Link to="/"><img src={logo} alt="logo" className="logotype" /></Link>
        <Link to="/register">
      <button className="btn-heading-signup"> Sign Up 
      </button ></Link>
      <Link to="/login" ><button className="btn-heading-login" > Log In 
      </button></Link>
    </div>
    <div className="home-title">
      <h1 className="title-home">Don’t loose <span className="that-span">that</span> great idea.</h1>
      <p className="slogan-home">
      Create a space of your own</p>
      <Link to="/register">
      <button className="btn-signup" >
      Sign up now for free
      </button></Link>
    </div>
    <div className="home-content">
      <div className="that-idea">
      <img src={noteThat} alt="note-that" className="note-that-img" />
      </div>
      <div className="that-idea-content">
      <img src={postIt} alt="post-it" className="post-it-img" />
      <div className="bye-paper-div">
      <img src={byePaper} alt="bye-paper" className="bye-paper"  />
      <p >
    Help the enviroment by using less paper and use Note That!
    </p>
    </div>
      </div>
      </div>
      <div className="footer">
      <img src={feather} alt="logo-footer" className="logo-footer" />
      </div>
  </div>
  );
}

export default Home;
