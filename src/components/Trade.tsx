import React, { useState } from 'react';
import { TextField, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { BtnPrimary } from '../shared/Button';
import useAxios from '../hooks/useAxios';
import axios from '../api/instruments';
import useTrade from '../hooks/useTrade';

interface IProps {
    code: string;
    name: string;
    price: number;
    open: boolean;
    handleClose: () => void;
}

export default function Trade() {
    const { code, setCode, name, setName, price, setPrice, open, setOpen }: any = useTrade();
    const [quantity, setQuantity] = useState(0);
    const amount = quantity * price;

    const _handleClose = () => {
        setQuantity(0);
        setOpen(false);
    };
    const handleSubmit = async () => {
        console.log(amount);
        _handleClose();
        //     // TODO post request
        //     // console.log(res.data);
    };
    return (
        <Dialog open={open} onClose={_handleClose}>
            <DialogTitle>{code}</DialogTitle>
            <DialogContent>
                <TextField margin="dense" label="Code" type="text" fullWidth variant="standard" value={code} onChange={(e) => setCode(e.target.value)} />
                <TextField margin="dense" label="Name" type="text" fullWidth variant="standard" value={name} />
                <TextField margin="dense" label="Price" type="text" fullWidth variant="standard" value={price} onChange={(e) => setPrice(e.target.value)} />
                <TextField autoFocus margin="dense" label="Quantity" type="text" fullWidth variant="standard" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                <div>{amount}</div>
            </DialogContent>
            <DialogActions>
                <BtnPrimary onClick={handleSubmit}>Buy</BtnPrimary>
                <BtnPrimary onClick={handleSubmit}>Sell</BtnPrimary>
            </DialogActions>
        </Dialog>
    );
}
