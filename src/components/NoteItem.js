import { useRef, useState, useEffect } from 'react';

export default function NoteItem(props) {
  const noteRef = useRef(null);
  const noteItemRef = useRef(null);
  const [bShouldShowMore, setShowMore] = useState(false);
  const [bAllowShowMore, setAllowShowMore] = useState(false);

  useEffect(() => {
    if (!bAllowShowMore &&
        noteRef.current.scrollHeight > noteRef.current.offsetHeight) {
        setAllowShowMore(true);
    }
  }, []);

  const _defineInitials = (userName) => {
    return userName.split(" ").reduce((sAcc, sNamePart) => { return sAcc += sNamePart[0]}, "")
  };

  const _addMarginTopIfNeeded = (index) => {
    return {
        marginTop: index === 0 ? "2vh" : "0"
    };
  };

  const _renderNoteItem = props => {
      const { note: noteInfo, image } = props;
      const { userName, time, note, isMine} = noteInfo;
      const oDate = new Date(time)
      const sDate = oDate.toLocaleDateString("en-GB");
      const sTime = oDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return (
            <div ref={noteItemRef} datatype={!isMine ? "others": "mine"} style={_addMarginTopIfNeeded(props.index)} className={"note-container"}>
                <div datatype={!isMine ? "others": "mine"} className={"note-item"}>
                    {image ? <img src={image} alt="user-pic" className="user-pic"/> : <p className="initials">{_defineInitials(userName)}</p>}
                    <div className="note-info">
                        <div className="note-info-post">
                            <p className="note-info-name">{userName}</p>
                            <p className="note-info-date">{sDate} · {sTime}</p>
                        </div>
                        <div datatype={!isMine ? "others" : "mine"} className={"note-info-text"}>
                            <p ref={noteRef} className={`note ${!bShouldShowMore ? "hide-content" : "show-content"}`}>
                                {note}
                            </p>
                            {bAllowShowMore ? <label className="read-more" onClick={() => {
                                setShowMore(!bShouldShowMore)
                            }}>{!bShouldShowMore ? "Read More" : "Read Less"}</label> : null}
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
