import React, { useState, useEffect } from 'react';

import ListRenderer from './components/ListRenderer';
import AddNoteRenderer from './components/AddNoteRenderer';
import DialogFilterRenderer from './components/DialogFilterRenderer';

import testNotes from './json/notes.json';
import userImages from './json/userImages.json';
import './App.css';

const ref = React.createRef();

const ReferencedListRenderer = React.forwardRef((props, ref) => (
  <ListRenderer notes={props.notes} reference={ref} userImages={userImages} 
    listChecked={props.listChecked} applyFilters={props.applyFilters}/>
));

const fetchedNotes = JSON.parse(localStorage.getItem("notes"));
const allNotes = Array.isArray(fetchedNotes) && fetchedNotes.length > 0 ? fetchedNotes : testNotes.notes;

function App() {
  const [notes, setNotes] = useState(allNotes);
  const [open, showDialog] = useState(false);
  const [applyFilters, setApplyFilters] = useState(false);
  const [listChecked, setListChecked] = useState({});

  useEffect(() => {
    ref?.current?.scrollIntoView({behavior: "smooth"});
  }, [notes]);

  const _addNote = (newNotes) => {
    setNotes(newNotes)
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const _closeDialogFilters = (bApplyFilters) => {
    if(!bApplyFilters) {
      setListChecked({});
    }
    setApplyFilters(bApplyFilters);
    showDialog(false);
    ref?.current?.scrollIntoView({behavior: "smooth"});
  };

  const _openDialogFilters = () => {
    showDialog(true);
  };
  
  return (
    <div className="main-div box-shadow">
      <div className="gradient-header"/>
      <ReferencedListRenderer notes={notes} ref={ref} listChecked={listChecked} applyFilters={applyFilters}/>
      <AddNoteRenderer notes={notes} addNote={_addNote} openDialogFilters={_openDialogFilters} />
      <DialogFilterRenderer notes={notes} open={open}
        setListChecked={setListChecked} listChecked={listChecked} closeDialogFilters={_closeDialogFilters}/>
    </div>
  );
} 

export default App;
