import { useLocation, Outlet, Navigate } from "react-router-dom";
import React from "react";
import useAuth from "../hooks/useAuth";
import jwt_decode from 'jwt-decode';

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const decoded = auth?.accessToken // we can decode the jwt and get the stored information
        ? jwt_decode(auth.accessToken)
        : undefined; 

    return (
        auth?.accessToken
            ? <Outlet />
            : <Navigate to="/signin" state={{ from: location }} replace />
    )
}

export default RequireAuth;