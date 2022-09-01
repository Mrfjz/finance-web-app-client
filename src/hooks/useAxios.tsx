import { useState, useEffect } from 'react';
import { AxiosInstance, AxiosError } from 'axios';

interface IConfig {
    axiosInstance: AxiosInstance;
    method: string;
    url: string;
    requestConfig?: object;
}

function useAxios(configObj: IConfig): [any, string, boolean] {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        let isMounted = true;
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const res = await axiosInstance(url, {
                    method,
                    ...requestConfig,
                    signal: controller.signal
                });
                if (isMounted) {
                    setError('');
                    setResponse(res.data);
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return [response, error, loading];
}

export default useAxios;
