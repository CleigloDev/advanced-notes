import { useRef, useState, useEffect } from 'react';

export default function NoteItem(props) {
    const { showDialogUserInfo } = props;
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

    const _defineInitials = (sUserName) => {
        // Concat first letter of name & surname
        return sUserName.split(" ").reduce((sAcc, sNamePart) => { return sAcc += sNamePart[0]}, "")
    };

    const _addMarginTopIfNeeded = (index) => {
        return {
            marginTop: index === 0 ? "2vh" : "0"
        };
    };

    const _hadleShowDialogUserInfo = (isMine) => {
        showDialogUserInfo(isMine);
    };

    const _renderImageOrInitial = (image, isMine, sUserName) => {
       return image ? 
            <img 
                src={image} 
                alt="user-pic" 
                className="user-pic" 
                datatype={!isMine ? "others" : "mine"}
                onClick={() => _hadleShowDialogUserInfo(isMine)}/> : 
            <p 
                className="initials" 
                onClick={() => _hadleShowDialogUserInfo(isMine)}>
                    {_defineInitials(sUserName)}
            </p>
    };

    const _renderNoteInfo = (isMine, sUserName, sDate, sTime) => (
        <div className="note-info-post">
            <p datatype={!isMine ? "" : "mine"} 
                onClick={() => _hadleShowDialogUserInfo(isMine)}
                className="note-info-name">{sUserName}
            </p>
            <p className="note-info-date">
                {sDate} · {sTime}
            </p>
        </div>
    );

    const _renderNoteText = (isMine, sNote) => {
        const aNoteSplittedNewLine = sNote.split("\n");
        if (!bAllowShowMore && aNoteSplittedNewLine.length > 3) {
            setAllowShowMore(true);
        }
        return (
            <div 
                datatype={!isMine ? "others" : "mine"} 
                className={"note-info-text"}>
                <p ref={noteRef} 
                    className={`note ${!bShouldShowMore ? "hide-content" : "show-content"}`}>
                    {sNote}
                </p>
                {bAllowShowMore ? <label className="read-more" 
                    onClick={() => { setShowMore(!bShouldShowMore) }}>
                    {!bShouldShowMore ? "Read More" : "Read Less"}</label> : null}
            </div>
        );
    };

    const _renderNoteItem = props => {
    const { note: noteInfo, image, index } = props;
    const { userName, time, note, isMine} = noteInfo;
    const oDate = new Date(time)
    const sDate = oDate.toLocaleDateString("en-GB");
    const sTime = oDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return (
        <div ref={noteItemRef} 
            datatype={!isMine ? "others": "mine"} 
            style={_addMarginTopIfNeeded(index)} 
            className={"note-container"}>
            <div datatype={!isMine ? "others": "mine"} className={"note-item"}>
                {_renderImageOrInitial(image, isMine, userName)}
                <div className="note-info">
                    {_renderNoteInfo(isMine, userName, sDate, sTime)}
                    {_renderNoteText(isMine, note)}
                </div>
            </div>
        </div>
        );
    }

  return _renderNoteItem(props);
};
