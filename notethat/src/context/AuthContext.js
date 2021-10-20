import React, { createContext, useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,signInWithPopup, GoogleAuthProvider,signOut
} from "firebase/auth";
import { auth } from "../firebaseconfig";


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUid, setUid] = useState({});


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setCurrentUser(user)
        setUid(user.uid)
      }else{
        console.log('im not logged in')
      }
    });
  }, []);


  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    signOut(auth);
  };

 
 

const loginGoogle=()=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
} 

  const value = { signup, login, currentUser, loginGoogle,logout,currentUid};

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
