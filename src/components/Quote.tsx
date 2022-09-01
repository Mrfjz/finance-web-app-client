import React from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import axios from '../api/instruments';
import { List, ListItem, ListItemText, Divider, Grid } from '@mui/material';
import { border } from '@mui/system';
import Chart from './Chart';

function convertData(rawData: any): any {
    const change = rawData.price - rawData.prevClose;
    const percentageChange = rawData.price / rawData.prevClose - 1;
    return {
        ...rawData,
        change,
        percentageChange
    };
}
const style = {
    width: '50%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    border: 'solid black'
};

interface IProps {
    label: string;
    data: number | string;
}

const Item = ({ label, data }: IProps) => {
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <span>{label}</span>
            <span>{data}</span>
        </Grid>
    );
};

const Quote = () => {
    const { code } = useParams();
    const [rawData, error, loading] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: `/instruments/${code}/summary`
    });

    const data = !error && !loading ? convertData(rawData) : null;

    return (
        <>
            {loading && <p>loading...</p>}
            {!loading && error && <p>{error}</p>}
            {data && (
                <div>
                    <h1>{`${data.name}(${data.code})`}</h1>
                    <h1>{`${data.price} ${data.change} (${data.percentageChange})`}</h1>
                    <Grid container direction="row">
                        <List sx={style} component="nav">
                            <Item label={'Previous Close'} data={data.prevClose} />
                            <Item label={'Open'} data={data.open} />
                            <Item label={"Day's Range"} data={data.open} />
                            <Item label={'52 Week Range'} data={data.open} />
                            <Item label={'Market Cap'} data={data.open} />
                        </List>
                        <div>
                            <Chart title={data.code} data={data.historicData} />
                        </div>
                    </Grid>
                </div>
            )}
        </>
    );
};

export default Quote;
