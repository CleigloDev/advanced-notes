import React from 'react';
import NoteItem from './NoteItem';

export default function ListRenderer(props) {
  
  const _renderListItem = props => {
    var { notes, userInfo, showDialogUserInfo } = props;
    const { reference, applyFilters, listChecked } = props;
    if(applyFilters) {
      const aNameFiltered = Object.keys(listChecked).filter(sUserName => {
        return listChecked[sUserName];
      });
      notes = aNameFiltered.length > 0 ? notes.filter((oNote) => {
        return aNameFiltered.includes(oNote.userName);
      }) : notes;
    }
    notes = notes.sort((firstElm, secondElm) => firstElm.time - secondElm.time);
    return (
      <div className="list-renderer">
        <dl>
          {notes.map((oNote, index) => {
            oNote.userName = oNote.isMine && userInfo?.userName ? userInfo.userName : oNote.userName; 
            return (<NoteItem index={index} note={oNote} image={props.userImages[oNote.userName]} showDialogUserInfo={showDialogUserInfo}/>)
          })}
        </dl>
        <div ref={reference}/>
      </div>
    );
  };

  return _renderListItem(props);
};
