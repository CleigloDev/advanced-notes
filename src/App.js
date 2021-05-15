import React, { useState, useEffect } from 'react';
import ListRenderer from './components/ListRenderer';
import AddNoteRenderer from './components/AddNoteRender';
import testNotes from './json/notes.json';
import userImages from './json/userImages.json';
import './App.css';

const ref = React.createRef();

const ReferencedListRenderer = React.forwardRef((props, ref) => (
  <ListRenderer notes={props.notes} reference={ref} userImages={userImages}/>
));

const fetchedNotes = JSON.parse(localStorage.getItem("notes"));
const allNotes = Array.isArray(fetchedNotes) && fetchedNotes.length > 0 ? fetchedNotes : testNotes.notes;

function App() {
  const [notes, setNotes] = useState(allNotes);

  useEffect(() => {
    ref?.current?.scrollIntoView({behavior: "smooth"});
  }, [notes]);

  const _addNote = (newNotes) => {
    setNotes(newNotes)
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };
  
  return (
    <div className="main-div box-shadow">
      <div className="gradient-header"/>
      <ReferencedListRenderer notes={notes} ref={ref}/>
      <AddNoteRenderer notes={notes} addNote={_addNote} />
    </div>
  );
} 

export default App;
