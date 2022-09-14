import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import Signin from './components/Signin';
import Signup from './components/Signup';
import PasswordRecovery from './components/ForgotPassword';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import PersistLogin from './components/PersisLogin';
import Instruments from './components/Instruments';
import Quote from './components/Quote';

export default function App() {
    return (
        <>
            <Routes>
                <Route
                    element={
                        <>
                            <Navbar />
                            <hr />
                            <Outlet />
                        </>
                    }
                >
                    <Route path="/" element={<Instruments type="stock" key="stocks" />} />
                    <Route path="stocks" element={<Instruments type="stock" key="stocks" />} />
                    <Route path="currencies" element={<Instruments type="currency" key="currencies" />} />
                    <Route path="cryptocurrencies" element={<Instruments type="cryptocurrency" key="cryptocurrencies" />} />
                    <Route element={<PersistLogin />}>
                        <Route element={<RequireAuth />}>
                            <Route path="portfolio" element={<Portfolio />} />
                        </Route>
                    </Route>
                    <Route path="unauthorized" element={<Unauthorized />} />
                    <Route path="quote/:code" element={<Quote />} />
                </Route>
                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />
                <Route path="passwordrecovery" element={<PasswordRecovery />} />
                <Route path="*" element={<Missing />} />
            </Routes>
        </>
    );
}
