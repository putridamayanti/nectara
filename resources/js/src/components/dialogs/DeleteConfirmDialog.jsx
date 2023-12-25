import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import {useTranslation} from "react-i18next";

const AlertDialog = ({ open, onClose, onSubmit }) => {
    const { t } = useTranslation();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                {t('DeleteConfirmation')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are You Sure Want To Delete This Data?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{ color: 'grey'}}>Cancel</Button>
                <Button color="error" onClick={onSubmit} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog;
