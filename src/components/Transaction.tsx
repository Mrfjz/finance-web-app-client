import React, { useContext, useState } from 'react';
import { TextField, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { BtnPrimary } from '../shared/Button';
import useAxios from '../hooks/useAxios';
import axios from '../api/instruments';
import useTransaction from '../hooks/useTransaction';

interface IProps {
    type: string;
    open: boolean;
    handleClose: () => void;
}

export default function Transaction() {
    const { open, setOpen, type }: any = useTransaction();
    const [amount, setAmount] = useState(0);

    const _handleClose = () => {
        setAmount(0);
        setOpen(false);
    };
    const handleSubmit = async () => {
        console.log(amount);
        _handleClose();
        // TODO post request
        // console.log(res.data);
    };
    return (
        <Dialog open={open} onClose={_handleClose}>
            <DialogTitle>{type}</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" id="name" label="Amount" type="number" fullWidth variant="standard" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            </DialogContent>
            <DialogActions>
                <BtnPrimary onClick={_handleClose}>Cancel</BtnPrimary>
                <BtnPrimary onClick={handleSubmit}>Confirm</BtnPrimary>
            </DialogActions>
        </Dialog>
    );
}
