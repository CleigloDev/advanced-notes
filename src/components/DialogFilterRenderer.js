import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';

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
            <FormControlLabel 
                key={index}
                control={<Checkbox checked={oListChecked[sUserName] || false} 
                onChange={handleChange} 
                name={sUserName} />}
                label={sUserName} 
                className="text-capitalize-checkbox"
            />
        ))
    );

    const _renderDialogFilter = props => {
        const { open, notes, listChecked, closeDialogFilters } = props;
        const userNameSet = [...new Set(notes.map(oNote => oNote.userName))]
        return(
            <Dialog open={open}>
                <Toolbar>
                    <IconButton edge="start"
                        onClick={() => closeDialogFilters(false, false)}>
                        <CloseIcon />
                    </IconButton>

                    <Typography>
                        <b>Filter Users</b>
                    </Typography>
                </Toolbar>
                <DialogContent dividers>
                    <FormControl className="form-filters">
                        {_renderCheckBoxFilters(userNameSet, listChecked)}
                    </FormControl>
                </DialogContent>
                <DialogActions>

                    <Button 
                        className="button-cancel" 
                        onClick={() => closeDialogFilters(false, true)}>
                            <b>Reset</b>
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