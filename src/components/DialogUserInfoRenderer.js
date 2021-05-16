import { useState, useRef } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

var promiseLoadImage = [];

export default function DialogUserInfoRenderer(props) {
    const [nameSurname, setNameSurname] = useState(props.userInfo?.userName || "");
    const [fileName, setFileName] = useState("");
    const refFileUploader = useRef(null);

    const handleChange = (event) => {
        setNameSurname(event.target.value);
    };

    const _handleFileLoading = (event) => {
        const { files } = event.target;
        if(files?.length > 0) {
            const { name } = files[0];
            setFileName(name);
        }
        promiseLoadImage.push(_promiseLoadImage());
    };

    const _promiseLoadImage = () => {
        return new Promise((resolve) => {
            const files = refFileUploader.current.files;

            if (files?.length > 0) {
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
        setFileName("");
        props.closeDialogUserInfo(nameSurname, image[0]);
    };

    const _closeDialogUserInfoCancel = () => {
        setNameSurname(props.userInfo?.userName || "");
        setFileName("");
        promiseLoadImage = [];
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
                        <label className={"select-user-pic"} htmlFor="user-pic">Select photo</label>

                        {fileName ? <p>File loaded</p> : null}

                        <input
                            ref={refFileUploader} 
                            id="user-pic" 
                            type="file" 
                            accept="image/png, image/jpeg" 
                            style={{visibility: "hidden"}}
                            onChange={(event) => _handleFileLoading(event)}
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