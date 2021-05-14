import React, { useState, useEffect } from 'react';
import ListRenderer from './components/ListRenderer';
import './App.css';
const ref = React.createRef();

const ReferencedListRenderer = React.forwardRef((props, ref) => (
  <ListRenderer notes={props.notes} reference={ref}/>
));

function App() {
  const [notes, setNotes] = useState([
    { userName: "test", time: 1621026120281, note: "ciao", isMine: false}, 
    { userName: "test", time: 111026140281, note: "ciao", isMine: false}
  ]);
  const [textNote, setNoteText] = useState("");

  useEffect(() => {
    ref?.current?.scrollIntoView({behavior: "smooth"});
  }, [notes]);
  
  return (
    <div style={{height: "85vh", width: "70vw"}} className="box-shadow">
    
    <ReferencedListRenderer notes={notes} ref={ref}/>
      
      <div className="bottom-container">
        <div className="input-container">
          <input placeholder="Enter note about the process" className="input" value={textNote} onChange={event => {
            setNoteText(event.target.value)
            }}/>
        </div>
        <div className="button-container">
          <button onClick={() => {
            const oNow = new Date();
            setNotes([...notes, {userName: "You", time: oNow.getTime(), note: textNote, isMine: true}]);
            setNoteText("");
          }} className="button">Publish</button>
        </div>
      </div>
    </div>
  );
} 

export default App;
