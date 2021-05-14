import React from 'react';
import NoteItem from './NoteItem';

export default function ListRenderer(props) {

  const _renderListItem = props => (
    <div className="list-renderer">
      <dl>
        {props.notes.map((oNote) => (
          <NoteItem note={oNote}/>
        ))}
      </dl>
      <div ref={props.reference}/>
    </div>
  )

  return _renderListItem(props);
};
