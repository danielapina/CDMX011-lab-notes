import React, { createContext, useState, useEffect, useContext } from "react";
import {
  signInWithPopup, GoogleAuthProvider
} from "firebase/auth";



const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children, ...restProps}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUid, setUid] = useState({});


  useEffect(() => {
    restProps.onAuthStateChanged(restProps.auth, (user) => {
      if(user){
        setCurrentUser(user)
        setUid(user.uid)
      }else{
        console.log('im not logged in')
      }
    });
  }, []);


  const signup = (email, password) => {
    return restProps.createUserWithEmailAndPassword(restProps.auth, email, password);
  };
  const login = (email, password) => {
    return restProps.signInWithEmailAndPassword(restProps.auth, email, password);
  };
  const logout = () => {
    restProps.signOut(restProps.auth);
  };

 
 

const loginGoogle=()=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(restProps.auth, provider);
} 

  const value = { signup, login, currentUser, loginGoogle,logout,currentUid};

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
