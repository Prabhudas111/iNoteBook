import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://inotebook-server-bay.vercel.app";
  const initialNote = [];
  const [notes, setnotes] = useState(initialNote);

  //get all notes
  const getNotes = async () => {
    //TODO : API call
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    console.log(json);
    setnotes(json);
  };

  //add a note
  const addNote = async (title, description, tag) => {
    //TODO : API call
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("Adding a New Note");
    const note = await response.json();
    setnotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = async (id) => {
    //TODO : API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);

    console.log("Deleting the Note with id " + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNote);
  };

  //edit a note
  // const editNote = async (id, title, description, tag) => {
  //   // API Call
  //   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token":
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q",
  //     },
  //     body: JSON.stringify({ title, description, tag }),
  //   });
  //   const json = await response.json();
  //   console.log(json);

  //   let newNotes = JSON.parse(JSON.stringify(notes));
  //   // Logic to edit in client
  //   for (let index = 0; index < newNotes.length; index++) {
  //     const element = newNotes[index];
  //     if (element._id === id) {
  //       newNotes[index].title = title;
  //       newNotes[index].description = description;
  //       newNotes[index].tag = tag;
  //       break;
  //     }
  //   }
  //   setnotes(newNotes);
  // };

  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.  CHECK IT AT MOST PUT
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    //logic to edit a note

    let newNotes = await JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
