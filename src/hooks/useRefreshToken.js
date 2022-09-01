import axios from '../api/axios'
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });

        const newAccessToken = response.data.accessToken;
        setAuth(prev => {
            return {
                ...prev,
                accessToken: newAccessToken
            }
        });

        return newAccessToken;
    }

    return refresh;
}

export default useRefreshToken