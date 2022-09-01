import { useContext } from 'react';
import TransactionContext from '../context/TransactionProvider';

const useTransaction = () => {
    return useContext(TransactionContext);
};

export default useTransaction;
