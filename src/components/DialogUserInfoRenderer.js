import { useState, useRef } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function DialogUserInfoRenderer(props) {
    var promiseLoadImage = [];
    const [nameSurname, setNameSurname] = useState(props.userInfo?.userName || "");
    const refFileUploader = useRef(null);

    const handleChange = (event) => {
        setNameSurname(event.target.value);
    };

    const _handleFileLoading = () => {
        promiseLoadImage.push(_promiseLoadImage());
    };

    const _promiseLoadImage = () => {
        return new Promise((resolve) => {
            const files = refFileUploader.current.files;

            if (files.length) {
                const reader = new FileReader()
                reader.addEventListener('load', (e) => {
                    resolve(reader.result);
                });
                reader.readAsDataURL(files[0]);
            } else {
                resolve("");
            }
        });
    };

    const _closeDialogUserInfoApply = async() => {
        const image = await Promise.all(promiseLoadImage);
        promiseLoadImage = [];
        props.closeDialogUserInfo(nameSurname, image[0]);
    };

    const _closeDialogUserInfoCancel = () => {
        setNameSurname(props.userInfo?.userName || "");
        props.closeDialogUserInfo();
    };

    const _renderDialogUserInfo = props => {
        const { open } = props;
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

                    <div className="upload-photo-container">
                        <label htmlFor="user-pic">Select photo</label>

                        <input
                            ref={refFileUploader} 
                            id="user-pic" 
                            type="file" 
                            accept="image/png, image/jpeg" 
                            style={{visibility: "hidden"}}
                            onChange={() => _handleFileLoading()}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button 
                        className="button-cancel" 
                        onClick={() => _closeDialogUserInfoCancel(false)}>
                        <b>Cancel</b>
                    </Button>

                    <Button 
                        className="button-ok" 
                        disabled={nameSurname === ""}
                        onClick={() => _closeDialogUserInfoApply(true)}>
                        <b>Ok</b>
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return _renderDialogUserInfo(props);
};