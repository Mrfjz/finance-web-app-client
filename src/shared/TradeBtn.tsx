import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import useTrade from '../hooks/useTrade';

interface IProps {
    code: string;
    name: string;
    price: number;
}

const TradeBtn = ({ code, name, price }: IProps) => {
    const { setOpen, setCode, setName, setPrice }: any = useTrade();
    useEffect(() => {
        setCode(code);
        setName(name);
        setPrice(price);
    }, []);
    return <Button onClick={() => setOpen(true)}>Buy/Sell</Button>;
};

export default TradeBtn;
