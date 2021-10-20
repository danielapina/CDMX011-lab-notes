import React, {useState} from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { Modal } from './Modal';
import Swal from 'sweetalert2';
import "./styles/Note.css";
import { Icon } from '@iconify/react';


export const Note = ({ note }) => {
  const { id,title, information,date } = note;

  const [isVisible, setIsVisible] = useState(false);

  
  

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

 const showAlert = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
        deleteNote()
    }
  })
 };
  const deleteNote = async () => {
    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="card-body" >
      <p className="note-title">{title}</p>
       <p className='note-information'>{information}</p> 
     <div className="card-actions" >
      <p className="note-date"><span className='date-label'>Last Mod. </span>{date}</p>
        <button className="edit-btn" onClick={showModal}><Icon icon="eva:edit-2-fill" color="#20399f" height="25" /></button>
        <button className="delete-btn" onClick={showAlert}>
        <Icon icon="fluent:delete-20-filled" color="#20399f" height="25" />
        </button>
      </div> 
     
     
      {
          isVisible && 
          <Modal note={note} mode='edit' isVisible={isVisible} hideModal={hideModal}/>
      }
    </div>
  );
};
