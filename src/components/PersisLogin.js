import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refreshToken = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const veryfiRefreshToken = async () => {
            try {
                await refreshToken();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        }
        !auth?.accessToken ? veryfiRefreshToken() : setIsLoading(false);
    }, [])

    return (
        <>
            {isLoading ? <p>loading...</p> : <Outlet />}
        </>
    )

}

export default PersistLogin;