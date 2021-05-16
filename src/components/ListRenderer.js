import NoteItem from './NoteItem';

export default function ListRenderer(props) {

  const _applyFilterIfNeeded = (listChecked, notes) => {
    const aNameFiltered = Object.keys(listChecked).filter(sUserName => {
      return listChecked[sUserName];
    });
    return notes = aNameFiltered.length > 0 ? notes.filter((oNote) => {
      return aNameFiltered.includes(oNote.userName);
    }) : notes;
  };

  const _sortNotes = (notes) => {
    return notes.sort((firstElm, secondElm) => firstElm.time - secondElm.time);
  };

  const _renderNoteItem = (notes) => {
    var { userInfo, showDialogUserInfo } = props;
    return notes.map((oNote, index) => {
      oNote.userName = oNote.isMine && userInfo?.userName ? userInfo.userName : oNote.userName; 
      const image = oNote.isMine && userInfo?.image ? userInfo.image : props.userImages[oNote.userName]; 
      return (<NoteItem index={index} note={oNote} image={image} showDialogUserInfo={showDialogUserInfo}/>)
    })
  };
  
  const _renderListItem = props => {
    var { notes } = props;
    const { reference, applyFilters, listChecked } = props;
    if(applyFilters) {
      notes = _applyFilterIfNeeded(listChecked, notes);
    }
    notes = _sortNotes(notes);
    return (
      <div className="list-renderer">
        <dl>
          {_renderNoteItem(notes)}
        </dl>
        <div ref={reference}/>
      </div>
    );
  };

  return _renderListItem(props);
};
