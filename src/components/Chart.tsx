import React, { useState, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Grid, Button } from '@mui/material';
import { startOfDay, addDays, addMonths, startOfMonth, startOfYear, addYears } from 'date-fns';

interface IProps {
    title: string;
    data: Array<Array<number>>;
}

function getDates(data: Array<Array<number>>) {
    const dates: Array<Date> = [];
    data.forEach((value) => {
        const [timestamp, _] = value;
        const datetime = startOfDay(new Date(timestamp));
        if (!dates.includes(datetime)) {
            dates.push(datetime);
        }
    });
    return dates;
}

const Chart = ({ title, data }: IProps) => {
    const [xmin, setXmin] = useState(1e11);
    const [xmax, setXmax] = useState(1e13);

    // extra dates from data
    const dates = useMemo(() => getDates(data), [data]);
    const series: any = [
        {
            name: 'price',
            data: data
        }
    ];

    const options: any = {
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0
        },
        title: {
            text: 'USD-HKD',
            align: 'left'
        },
        fill: {
            // type: 'gradient',
            // gradient: {
            //     shadeIntensity: 1,
            //     inverseColors: false,
            //     opacityFrom: 0.5,
            //     opacityTo: 0,
            //     stops: [0, 90, 100]
            // }
        },

        yaxis: {
            labels: {
                // formatter: function (val: number) {
                //     return (val / 1000000).toFixed(0);
                // }
            },
            title: {
                text: 'Price'
            }
        },
        xaxis: {
            type: 'datetime',
            min: xmin,
            max: xmax,
            tickAmount: 6
        },
        tooltip: {
            shared: false,
            x: {
                format: 'dd MMM yyyy'
            }
            // y: {
            //     formatter: function (val: number) {
            //         return (val / 1000000).toFixed(0);
            //     }
            // }
        }
    };

    function zoom(range: string) {
        const maxDate = addDays(dates[dates.length - 1], 1);
        let minDate = maxDate;
        switch (range) {
            case '1day':
                minDate = addDays(maxDate, -1);
                break;
            case '5day':
                minDate = dates[dates.length - 5];
                break;
            case '1month':
                minDate = startOfMonth(maxDate);
                break;
            case '6month':
                minDate = addMonths(startOfMonth(maxDate), -6);
                break;
            case 'ytd':
                minDate = startOfYear(maxDate);
                break;
            case '1year':
                minDate = addYears(maxDate, -1);
                break;
            case '5year':
                minDate = addYears(maxDate, -5);
                break;
            case 'max':
                minDate = dates[0];
                break;
        }
        setXmin(minDate.getTime() + Math.random());
        setXmax(maxDate.getTime());
    }

    return (
        <div>
            <Grid>
                <Button onClick={() => zoom('1day')}>1D</Button>
                <Button onClick={() => zoom('5day')}>5D</Button>
                <Button onClick={() => zoom('1month')}>1M</Button>
                <Button onClick={() => zoom('6month')}>6M</Button>
                <Button onClick={() => zoom('ytd')}>YTD</Button>
                <Button onClick={() => zoom('1year')}>1Y</Button>
                <Button onClick={() => zoom('5year')}>5Y</Button>
                <Button onClick={() => zoom('max')}>Max</Button>
            </Grid>
            <ReactApexChart options={options} series={series} type="line" height={350} />;
        </div>
    );
};

export default Chart;
