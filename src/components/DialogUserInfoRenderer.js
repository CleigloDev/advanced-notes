import { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function DialogUserInfoRenderer(props) {
    const [nameSurname, setNameSurname] = useState(props.userInfo?.userName || "");

    const handleChange = (event) => {
        setNameSurname(event.target.value);
    };

    const _renderDialogUserInfo = props => {
        const { open, closeDialogUserInfo } = props;
        return(
            <Dialog open={open}>
                <DialogTitle><b>Modify your info</b></DialogTitle>
                <DialogContent className="dialog-userinfo" dividers>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name Surname"
                        onChange={handleChange}
                        value={nameSurname}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button className="button-cancel" onClick={() => closeDialogUserInfo(null)} color="primary">
                        <b>Cancel</b>
                    </Button>
                    <Button className="button-ok" onClick={() => closeDialogUserInfo(nameSurname)} color="primary">
                        <b>Ok</b>
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return _renderDialogUserInfo(props);
};