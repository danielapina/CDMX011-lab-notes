import React, {useState} from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { Modal } from './Modal';
import "./styles/Note.css";


export const Note = ({ note }) => {
  const { id,title, information,date } = note;

  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

 

  const deleteNote = async () => {
    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card-body">
      <p className="note-title">{title}</p>
      <p className="note-date">{date}</p>
      <p className="note-information"> {information}</p>
      <div className="card-actions">
        <button className="edit-btn" onClick={showModal}>Edit</button>
        <button className="delete-btn" onClick={deleteNote}>
          Delete
        </button>
      </div>
      {
          isVisible && 
          <Modal note={note} mode='edit' isVisible={isVisible} hideModal={hideModal}/>
      }
    </div>
  );
};
