import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { TransactionProvider } from './context/TransactionProvider';
import { TradeProvider } from './context/TradeProvider';
// import PersistLogin from './components/PersistLogin';

const rootId = document.getElementById('root');
if (!rootId) {
    throw 'root element not found';
}
const root = ReactDOM.createRoot(rootId);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <TransactionProvider>
                    <TradeProvider>
                        <Routes>
                            {/* <Route element={<PersistLogin />}> */}
                            <Route path="/*" element={<App />} />
                            {/* </Route> */}
                        </Routes>
                    </TradeProvider>
                </TransactionProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
