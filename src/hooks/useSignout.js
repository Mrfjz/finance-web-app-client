import axios from '../api/axios';
import useAuth from './useAuth';

const useSignout = () => {
    const { setAuth } = useAuth();
    const signout = async () => {
        setAuth({});
        try {
            const response = await axios.get('/signout', {
                withCredentials: true
            });
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    }

    return signout
}

export default useSignout;