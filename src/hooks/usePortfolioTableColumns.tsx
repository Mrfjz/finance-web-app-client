import Link from '../shared/Link';
import { StyledText, StyledCode, StyledPrice, StyledPriceChange, StyledIcon } from '../shared/Table';
import RangeChart from '../shared/RangeChart';
import TradeBtn from '../shared/TradeBtn';

const formatPrice = (value: number, precision: number) => {
    const formatter = new Intl.NumberFormat('us', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
    });
    return formatter.format(value);
};

const formatPriceChangePercentage = (value: number) => {
    const formatter = new Intl.NumberFormat('us', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: 'always'
    });
    return formatter.format(value);
};

const nameCode = {
    Header: 'Name/Code',
    accessor: 'code',
    style: { width: '10%' },
    Cell: (props: any) => (
        <StyledCode>
            <Link to={`/quote/${encodeURIComponent(props.value)}`}>
                <div>{props.value} </div>
                <div>{props.row.original.name}</div>
            </Link>
        </StyledCode>
    )
};

const valueQuantity = {
    Header: 'Value/Quantity',
    accessor: 'value',
    Cell: (props: any) => (
        <div>
            <div>{props.value} </div>
            <div>{props.row.original.quantity}</div>
        </div>
    )
};

const priceCost = {
    Header: 'Price/Cost',
    accessor: 'lastPrice',
    Cell: (props: any) => (
        <div>
            <div>{props.value} </div>
            <div>{props.row.original.costPrice}</div>
        </div>
    )
};

const todayProfit = {
    Header: "Today's profit",
    accessor: 'todayProfit',
    style: { textAlign: 'right' },
    Cell: (props: any) => (
        <div>
            <div>
                <StyledPrice>{formatPrice(props.value, props.row.original.precision)} </StyledPrice>
            </div>
            <br></br>
            <div>
                <StyledPrice>{formatPriceChangePercentage(props.row.original.todayProfitRatio)}</StyledPrice>
            </div>
        </div>
    )
};

const positionProfit = {
    Header: 'position profit',
    accessor: 'positionProfit',
    style: { textAlign: 'right' },
    Cell: (props: any) => (
        <div>
            <div>
                <StyledPrice>{formatPrice(props.value, props.row.original.precision)} </StyledPrice>
            </div>
            <br></br>
            <div>
                <StyledPrice>{formatPriceChangePercentage(props.row.original.positionProfitRatio)}</StyledPrice>
            </div>
        </div>
    )
};

const trade = {
    Header: 'Trade',
    accessor: 'costPrice',
    Cell: (props: any) => <TradeBtn code={props.row.original.code} name={props.row.original.name} price={props.row.original.lastPrice} />
};

const usePortfolioTableColumns = () => {
    return [nameCode, valueQuantity, priceCost, todayProfit, positionProfit, trade];
};

export default usePortfolioTableColumns;
