import "./styles/Mynotes.css";
import logo from "../assets/logo.png";
import { Icon } from "@iconify/react";

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Note } from "./Note";
import { Modal } from "./Modal";
import { useAuth } from "../context/AuthContext";

import { db } from "../firebaseconfig";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";

function Mynotes() {
  const [notes, setNotes] = useState([]);
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [searchText, setSearchText] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const renderNotes = () => {
      try {
        onSnapshot(
          query(collection(db, "notes"),
          orderBy("date", "desc")),
          (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
              documents.push({ id: doc.id, ...doc.data() });
            });
            setNotes(documents);
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    return renderNotes();
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  const newNote = { title: "", information: "", date: "" };

  return (
    <div className="container-mynotes">
      <header className="header">
        <img src={logo} alt="logo" className="logotype" />
        <button className="btn-heading-logout" onClick={handleLogout}>
          Log Out
        </button>
      </header>

      <div className="div-btns">
        <div className="div-my-notes">
          <p>My Notes </p>
          <p>{currentUser.email}</p>
        </div>
        <div className="search">
          <Icon icon="bi:search" color="#20399F" height="28" />
          <input
            placeholder="Type to search..."
            type="text"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>

        <button className="btn-create-note" onClick={showModal}>
          <Icon
            className="add-icon"
            icon="ant-design:file-add-outlined"
            color="#FFFAD7"
            height="36"
          />
        </button>
      </div>

      <div className="notes-container">
        {notes
          .filter((nota) =>
            JSON.stringify(nota)
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
          .map((note) =>
            currentUser.uid === note.user ? (
              <Note note={note} key={note.id} />
            ) : (
              ''
            )
          )}
      </div>
      {isVisible && (
        <Modal
          mode="create"
          isVisible={isVisible}
          note={newNote}
          hideModal={hideModal}
        />
      )}
    </div>
  );
}
export default Mynotes;
