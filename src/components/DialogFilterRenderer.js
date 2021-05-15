

export default function DialogFilterRenderer(props) {

  const _renderDialogFilter = props => {
        const { notes, showDialog } = props;
        const notesSet = [...new Set(notes.map(oNote => oNote.userName))]
        return(
            <div />
        );
    };

  return _renderDialogFilter(props);
};
