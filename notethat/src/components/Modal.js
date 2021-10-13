import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { db } from '../firebaseconfig';
import { collection, addDoc, doc, setDoc  } from "firebase/firestore";
import "./styles/Modal.css";
import { Icon } from '@iconify/react';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor:'#FFFAD7',
    border:'none',
    borderRadius: '10px'
  },
};

export const Modal = ({note, mode, isVisible, hideModal }) => {
 const { id, title, information } = note;
 const [ newTitle, setNewTitle ] = useState(title);
 const [ newInformation, setNewInformation]  = useState(information);
 const [ isOpen, setIsOpen ] = useState(isVisible);
 

 const closeModal = () => {
     setIsOpen(false);
     hideModal();
 }

 const handleSubmit = e => {
     e.preventDefault();
     if(mode === 'edit'){
         updateNote();
     }else{
         createNote();
     }
     closeModal();
 }

 const handleTitleChange = (e) => setNewTitle(e.target.value);
 const handleInformationChange = (e) => setNewInformation(e.target.value);

 const createNote = async () => {
     try{
        await addDoc(collection(db, "notes"), {
            title : newTitle,
            information : newInformation
        })
     }catch(error){
         console.error(error);
     }
     
 }

 const updateNote = async () => {
     try{
        await setDoc(doc(db, "notes", id), {
            title : newTitle,
            information : newInformation,
          })
     }catch(error){
        console.error(error);
     }
}

 return (
    <ReactModal isOpen={isOpen} style={customStyles}  appElement={document.getElementById('root')}>
        <form className="modal" onSubmit={handleSubmit}>
            
            <button className="close-button" onClick={closeModal}><Icon  icon="ant-design:close-circle-filled" color="#20399f" height="26" /></button>

            <input className="modal-title" type="text" value={newTitle} placeholder="Title" onChange={handleTitleChange}/>
            <textarea className="modal-info" type="text" value={newInformation} placeholder="Note Information" onChange={handleInformationChange}/>
            {
                mode === 'edit' ?
                <button type="submit" className="edit-button" >Update Note</button> :
                <button type="submit" className="create-button" >Create Note</button>
            }

        </form>
    </ReactModal>
 )
}