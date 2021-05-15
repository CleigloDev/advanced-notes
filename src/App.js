import React, { useState, useEffect } from 'react';
import ListRenderer from './components/ListRenderer';
import AddNoteRenderer from './components/AddNoteRender';
import './App.css';

const ref = React.createRef();

const ReferencedListRenderer = React.forwardRef((props, ref) => (
  <ListRenderer notes={props.notes} reference={ref}/>
));

const fetchedNotes = JSON.parse(localStorage.getItem("notes"));
const allNotes = Array.isArray(fetchedNotes) && fetchedNotes.length > 0 ? fetchedNotes : [
  { userName: "test", time: 1621026120281, note: "ciao", isMine: false}, 
  { userName: "test", time: 111026140281, note: "ciao", isMine: false}
];

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
    <div className="main-div">
      <div className="gradient-header"/>
      <ReferencedListRenderer notes={notes} ref={ref}/>
      <AddNoteRenderer notes={notes} addNote={_addNote} />
    </div>
  );
} 

export default App;
