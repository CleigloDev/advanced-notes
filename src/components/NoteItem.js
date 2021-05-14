import { useState } from 'react';
import logo from '../images/images.jpg';

export default function ListRenderer(props) {
  const [bShouldShowMore, setShowMore] = useState(false);

  const _renderNoteItem = props => {
      const { userName, time, note, isMine} = props.note;
      const oDate = new Date(time)
      const sDate = oDate.toLocaleDateString();
      const sTime = oDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return (
            <div className={`note-container ${!isMine ? "note-container-others": "note-container-mine"}`}>
                <div className={`note-item ${!isMine ? "note-item-others": "note-item-mine"}`}>
                    <img src={logo} alt="user-pic" className="user-pic"/>
                    <div className="note-info">
                        <div className="note-info-post">
                            <p className="note-info-name">{userName}</p>
                            <p className="note-info-date">{sDate} · {sTime}</p>
                        </div>
                        <div className={`note-info-text ${!isMine ? " note-info-text-others" : " note-info-text-mine"}`}>
                            <p className={!bShouldShowMore ? "hide-content" : "show-content"} style={{fontSize: "2.4vh", color: "#0f0f11"}}>
                                {note}
                            </p>
                            {/*<button onClick={() => {
                                setShowMore(!bShouldShowMore)
                            }}>{!bShouldShowMore ? "Show More" : "Show Less"}</button>*/}
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
