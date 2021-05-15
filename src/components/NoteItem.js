import { useRef, useState, useEffect } from 'react';
import logo from '../images/images-1.jpg';

export default function ListRenderer(props) {
  const noteRef = useRef(null);
  const [bShouldShowMore, setShowMore] = useState(false);
  const [bAllowShowMore, setAllowShowMore] = useState(false);

  useEffect(() => {
    if (!bAllowShowMore &&
      noteRef.current.scrollHeight > noteRef.current.offsetHeight) {
        setAllowShowMore(true);
    }
  }, []);

  const _renderNoteItem = props => {
      const { userName, time, note, isMine} = props.note;
      const oDate = new Date(time)
      const sDate = oDate.toLocaleDateString();
      const sTime = oDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return (
            <div datatype={!isMine ? "others": "mine"} className={"note-container"}>
                <div datatype={!isMine ? "others": "mine"} className={"note-item"}>
                    <img src={logo} alt="user-pic" className="user-pic"/>
                    <div className="note-info">
                        <div className="note-info-post">
                            <p className="note-info-name">{userName}</p>
                            <p className="note-info-date">{sDate} · {sTime}</p>
                        </div>
                        <div datatype={!isMine ? "others" : "mine"} className={"note-info-text"}>
                            <p datatype={!isMine ? "others" : "mine"} ref={noteRef} className={`note ${!bShouldShowMore ? "hide-content" : "show-content"}`}>
                                {note}
                            </p>
                            {bAllowShowMore ? <button onClick={() => {
                                setShowMore(!bShouldShowMore)
                            }}>{!bShouldShowMore ? "Show More" : "Show Less"}</button> : null}
                        </div>
                        {//<div className="test"/>
                        }
                    </div>          
                </div>
            </div>
        );
    }

  return _renderNoteItem(props);
};
