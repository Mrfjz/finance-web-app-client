import React, { createContext, useState, ReactNode } from 'react';
import Trade from '../components/Trade';

const TradeContext = createContext({});

interface Iprops {
    children?: ReactNode;
}

export const TradeProvider = ({ children }: Iprops) => {
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    return (
        <TradeContext.Provider value={{ code, setCode, open, setOpen, name, setName, price, setPrice }}>
            {children}
            <Trade />
        </TradeContext.Provider>
    );
};

export default TradeContext;
