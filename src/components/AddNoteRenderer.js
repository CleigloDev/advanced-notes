import { useState } from 'react';
import filter from '../icons/filtro.png';

export default function AddNoteRenderer(props) {
    const [textNote, setNoteText] = useState("");
    let { notes, addNote, openDialogFilters } = props;

    const _addNote = () => {
        const oNow = new Date();
        addNote([...notes, {userName: "You", time: oNow.getTime(), note: textNote, isMine: true}]);
        setNoteText("");
    }
    
    const _renderAddNote = () => {
        return (
            <div className="bottom-container">
                <div className="input-container">
                    <textarea placeholder="Enter note about the process" className="input" value={textNote} onChange={event => {
                    setNoteText(event.target.value)
                    }}/>
                </div>
                <div className="button-container">
                    <img src={filter} alt="filter-icon" onClick={openDialogFilters}/>
                    <button onClick={_addNote} className="button"
                    disabled={textNote === ""}><b>Publish</b></button>
                </div>
            </div>);
    }

  return _renderAddNote();
};
