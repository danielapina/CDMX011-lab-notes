import React, { useState, useEffect } from "react";
import { Note } from "./Note";
import { Modal } from './Modal';
import logo from "../assets/logo.png";
import "./styles/Mynotes.css";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseconfig";
import { collection, onSnapshot,orderBy } from "@firebase/firestore";
import { Icon } from '@iconify/react';

function Mynotes() {
  const [notes, setNotes] = useState([]);
  const { currentUser,logout } = useAuth();
 
  const handleLogout = async () => {
    try{
     await logout()
    }catch(error){
      console.log(error)
    }
  };

  useEffect(() => {
    const renderNotes = ()=>{
      try{
        onSnapshot(collection(db, "notes"),orderBy('date','asc'), (querySnapshot) => {
         const documents = [];
         querySnapshot.forEach((doc) => {
           documents.push({ id:doc.id, ...doc.data() });
         });
           setNotes(documents);
       })
     }catch(error){
       console.log(error)
     }
    }
    return renderNotes();
      
  }, []);
  

  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);
 
  const newNote = {title:'' , information:''};

  return (
    <div className="container-mynotes">
      <div className="header">
          <img src={logo} alt="logo" className="logotype" />
        <button className="btn-heading-logout" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      
        <div className="div-btns">
        <div className="div-my-notes">
          <p>My Notes </p>
          <p>{currentUser.email}</p>
          </div>
          
          <button className="btn-create-note" onClick={showModal}>
            Create  <span className="that-span"> that </span> new note <Icon className="add-icon" icon="ant-design:file-add-outlined" color="#20399f" height="28" />
          </button>
        </div>
     
      <div className="notes-container">
        {  
notes.map((note) => (
  currentUser.uid === note.user ?
  
  <Note note={note} key={note.id} /> : console.log('this user has 0 notes')
  
))
}      
      </div>
          {
            isVisible && 
            <Modal mode='create' isVisible={isVisible} note={newNote} hideModal={hideModal} />
          }

    </div>
  );
}

export default Mynotes;
