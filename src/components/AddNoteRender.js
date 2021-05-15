import { useState } from 'react';

export default function AddNoteRenderer(props) {
    const [textNote, setNoteText] = useState("");
    let { notes, addNote } = props;

    const _addNote = () => {
        const oNow = new Date();
        addNote([...notes, {userName: "You", time: oNow.getTime(), note: textNote, isMine: true}]);
        setNoteText("");
    }
    
    const _renderAddNote = () => {
        return (
            <div className="bottom-container box-shadow">
                <div className="input-container">
                    <textarea placeholder="Enter note about the process" className="input" value={textNote} onChange={event => {
                    setNoteText(event.target.value)
                    }}/>
                </div>
                <div className="button-container">
                    <button onClick={_addNote} className="button"
                    disabled={textNote === ""}>Publish</button>
                </div>
            </div>);
    }

  return _renderAddNote();
};
