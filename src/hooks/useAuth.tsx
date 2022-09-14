import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

interface IAuthContext {
    auth: any;
}

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
