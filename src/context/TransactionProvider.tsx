import React, { createContext, useState, ReactNode } from 'react';
import Transaction from '../components/Transaction';

const TransactionContext = createContext({});

interface Iprops {
    children?: ReactNode;
}

export const TransactionProvider = ({ children }: Iprops) => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');
    return (
        <TransactionContext.Provider value={{ open, setOpen, type, setType }}>
            {children}
            <Transaction />
        </TransactionContext.Provider>
    );
};

export default TransactionContext;
