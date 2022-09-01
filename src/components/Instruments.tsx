import React from 'react';
import Table from './Table';
import useTableColumn from '../hooks/useTableColumn';
import useAxios from '../hooks/useAxios';
import axios from '../api/instruments';

interface InstrumentsProps {
    type: string;
}

export default function Instruments({ type }: InstrumentsProps) {
    const columns = useTableColumn();
    const [data, error, loading] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '/overview',
        requestConfig: {
            params: {
                type,
                interval: 24 * 60 * 60,
                maxLength: 20
            }
        }
    });

    return (
        <>
            {loading && <p>loading...</p>}
            {!loading && error && <p>{error}</p>}
            {!loading && !error && <Table columns={columns} data={data} />}
        </>
    );
}
