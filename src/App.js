import React, { useState, useEffect } from 'react';

import ListRenderer from './components/ListRenderer';
import AddNoteRenderer from './components/AddNoteRenderer';
import DialogFilterRenderer from './components/DialogFilterRenderer';
import DialogUserInfoRenderer from './components/DialogUserInfoRenderer';

import testNotes from './json/notes.json';
import userImages from './json/userImages.json';
import './App.scss';

const ref = React.createRef();

const ReferencedListRenderer = React.forwardRef((props, ref) => (
  <ListRenderer 
    notes={props.notes}
    reference={ref} 
    userImages={userImages} 
    showDialogUserInfo={props.showDialogUserInfo} 
    userInfo={props.userInfo}
    listChecked={props.listChecked} 
    applyFilters={props.applyFilters}/>
));

const fetchedNotes = JSON.parse(localStorage.getItem("notes"));
const allNotes = Array.isArray(fetchedNotes) && fetchedNotes.length > 0 ? fetchedNotes : testNotes.notes;

function App() {
  const fetchedUserInfo = JSON.parse(localStorage.getItem("user-info"));
  
  const [notes, setNotes] = useState(allNotes);
  const [openDialogFilters, showDialogFilter] = useState(false);
  const [openDialogUserInfo, showDialogUserInfo] = useState(false);
  const [applyFilters, setApplyFilters] = useState(false);
  const [listChecked, setListChecked] = useState({});
  const [userInfo, setUserInfo] = useState(fetchedUserInfo);


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
    showDialogFilter(false);
    ref?.current?.scrollIntoView({behavior: "smooth"});
  };

  const _openDialogFilters = () => {
    showDialogFilter(true);
  };

  const _openDialogUserInfo = (bIsMine) => {
    showDialogUserInfo(bIsMine);
  };

  const _closeDialogUserInfo = (userName, image) => {
    if(userName || image) {
      image = image ? image : fetchedUserInfo?.image;
      var oUserInfo = { userName, image }
      setUserInfo(oUserInfo);
      localStorage.setItem("user-info", JSON.stringify(oUserInfo));
    }
    showDialogUserInfo(false);
  };
  
  return (
    <div className="main-div box-shadow">
      <div className="gradient-header"/>

      <ReferencedListRenderer 
        notes={notes} 
        ref={ref} 
        listChecked={listChecked} 
        userInfo={userInfo} 
        showDialogUserInfo={_openDialogUserInfo} 
        applyFilters={applyFilters}/>

      <AddNoteRenderer 
        notes={notes} 
        addNote={_addNote} 
        openDialogFilters={_openDialogFilters} />

      <DialogFilterRenderer 
        notes={notes} 
        open={openDialogFilters} 
        setListChecked={setListChecked} 
        listChecked={listChecked} 
        closeDialogFilters={_closeDialogFilters}/>

      <DialogUserInfoRenderer 
        open={openDialogUserInfo} 
        userInfo={userInfo} 
        closeDialogUserInfo={_closeDialogUserInfo} />
    </div>
  );
} 

export default App;
