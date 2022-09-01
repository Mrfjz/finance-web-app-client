import React, { useState, useContext } from 'react';
import useAxios from '../hooks/useAxios';
import axios from '../api/instruments';
import Chart from 'react-apexcharts';
import Table from './Table';
import usePortfolioTableColumns from '../hooks/usePortfolioTableColumns';
import { BtnPrimary } from '../shared/Button';
import useTransaction from '../hooks/useTransaction';

interface IPosition {
    code: string;
    name: string;
    lastPrice: number;
    costPrice: number;
    prevClosePrice: number;
    quantity: number;
    type: string;
    precision: number;
}

interface IRawData {
    cash: number;
    positions: Array<IPosition>;
}

function convertData(rawData: IRawData) {
    // calculate the profit of each position
    const positions = rawData.positions.map((p) => {
        return {
            ...p,
            value: p.lastPrice * p.quantity,
            todayProfit: (p.lastPrice - p.prevClosePrice) * p.quantity,
            todayProfitRatio: p.lastPrice / p.prevClosePrice - 1,
            positionProfit: (p.lastPrice - p.costPrice) * p.quantity,
            positionProfitRatio: p.lastPrice / p.costPrice - 1
        };
    });
    const instrumentsAsset = positions.reduce((accumulator, position) => {
        return accumulator + position.value;
    }, 0);

    // compute labels and series for pieChart
    const cash = rawData.cash;
    const types: Array<string> = [];
    const series: Array<number> = [];
    positions.forEach((p) => {
        const index = types.indexOf(p.type);
        if (index >= 0) {
            series[index] += p.value;
        } else {
            types.push(p.type);
            series.push(p.value);
        }
    });
    types.push('cash');
    series.push(cash);

    const totalAsset = cash + instrumentsAsset;
    return {
        totalAsset,
        cash,
        instrumentsAsset,
        positions,
        types,
        series
    };
}

export default function Portfolio() {
    const [rawData, error, loading]: [IRawData, string, boolean] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '/portfolio'
    });

    const { setOpen, setType }: any = useTransaction();

    const data = !error && !loading ? convertData(rawData) : null;
    const columns = usePortfolioTableColumns();

    return (
        <>
            {loading && <p>loading...</p>}
            {!loading && error && <p>{error}</p>}
            {data && (
                <div>
                    <p>Total asset: {data.totalAsset}</p>
                    <p>Cash: {data.cash}</p>
                    <p>Instruments asset: {data.instrumentsAsset}</p>
                    <BtnPrimary
                        onClick={() => {
                            setType('withdraw');
                            setOpen(true);
                        }}
                    >
                        Withdraw
                    </BtnPrimary>
                    <BtnPrimary
                        onClick={() => {
                            setType('deposit');
                            setOpen(true);
                        }}
                    >
                        Deposit
                    </BtnPrimary>

                    <Chart options={{ labels: data.types }} series={data.series} type="pie" width={500} height={320} />

                    <Table columns={columns} data={data.positions} />
                </div>
            )}
        </>
    );
}
