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

    const _renderCheckBoxFilters = (aUserNameSet, oListChecked) => (
        [...aUserNameSet].map((sUserName, index) => (
            <FormControlLabel key={index}
                control={<Checkbox checked={oListChecked[sUserName] || false} 
                onChange={handleChange} name={sUserName} />}
                label={sUserName}
            />
        ))
    );

    const _renderDialogFilter = props => {
        const { open, notes, listChecked, closeDialogFilters } = props;
        const userNameSet = [...new Set(notes.map(oNote => oNote.userName))]
        return(
            <Dialog open={open}>
                <DialogTitle><b>Filter Users</b></DialogTitle>
                <DialogContent dividers>
                    <FormControl className="form-filters">
                        {_renderCheckBoxFilters(userNameSet, listChecked)}
                    </FormControl>
                </DialogContent>
                <DialogActions>

                    <Button 
                        className="button-cancel" 
                        onClick={() => closeDialogFilters(false)}>
                            <b>Cancel</b>
                    </Button>

                    <Button 
                        className="button-ok" 
                        onClick={() => closeDialogFilters(true)}>
                        <b>Ok</b>
                    </Button>

                </DialogActions>
            </Dialog>
        );
    };

    return _renderDialogFilter(props);
};