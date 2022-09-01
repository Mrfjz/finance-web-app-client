import { useContext } from 'react';
import TradeContext from '../context/TradeProvider';

const useTrade = () => {
    return useContext(TradeContext);
};

export default useTrade;
