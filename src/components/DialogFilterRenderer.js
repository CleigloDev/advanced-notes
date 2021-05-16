import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function DialogFilterRenderer(props) {

    const handleChange = (event) => {
        const { target } = event;
        const { name, checked } = target;
        
        const listUsers = { ...props.listChecked }
        listUsers[name] = checked;

        props.setListChecked(listUsers);
    };

    const _renderDialogFilter = props => {
        const { open, notes, listChecked, closeDialogFilters } = props;
        const userNameSet = [...new Set(notes.map(oNote => oNote.userName))]
        return(
            <Dialog open={open}>
                <DialogTitle><b>Filter Users</b></DialogTitle>
                <DialogContent dividers>
                    <FormControl className="form-filters">
                        {[...userNameSet].map((sUserName, index) => (
                            <FormControlLabel key={index}
                                control={<Checkbox checked={listChecked[sUserName] || false} 
                                onChange={handleChange} name={sUserName} />}
                                label={sUserName}
                            />
                        ))}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button className="button-cancel" onClick={() => closeDialogFilters(false)} color="primary">
                        <b>Cancel</b>
                    </Button>
                    <Button className="button-ok" onClick={() => closeDialogFilters(true)} color="primary">
                        <b>Ok</b>
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return _renderDialogFilter(props);
};