import Link from '../shared/Link';
import { StyledText, StyledCode, StyledPrice, StyledPriceChange, StyledIcon } from '../shared/Table';
import RangeChart from '../shared/RangeChart';

const formatPrice = (value, precision) => {
    const formatter = new Intl.NumberFormat('us', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
    })
    return formatter.format(value);
}

const formatPriceChange = (value, precision) => {
    const formatter = new Intl.NumberFormat('us', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
        signDisplay: 'always'
    })
    return formatter.format(value);
}

const formatPriceChangePercentage = (value) => {
    const formatter = new Intl.NumberFormat('us', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: 'always',
    })
    return formatter.format(value);
}

const code = {
    Header: 'Symbol',
    accessor: 'code',
    style: { width: '10%' },
    Cell: props => <StyledCode>
        {props.row.original?.iconUrl
            && <StyledIcon alt='' src={props.row.original.iconUrl}></StyledIcon>}
        <Link to={`/quote/${encodeURIComponent(props.value)}`}> {props.value} </Link>
    </StyledCode>
}

const fullname = {
    Header: 'Name',
    accessor: 'name',
    style: { width: '15%' },
    Cell: props => <StyledText>
        {props.value}
    </StyledText>
}

const lastPrice = {
    Header: 'Last Price',
    accessor: 'lastPrice',
    style: { textAlign: 'right' },
    Cell: props => <StyledPrice>
        {props.value == null
            ? "N/A"
            : formatPrice(props.value, props.row.original.precision)
        }
    </StyledPrice>
}

const change = {
    Header: 'Change',
    accessor: 'change',
    style: { textAlign: 'right' },
    sortType: "basic",
    Cell: props => <StyledPriceChange value={props.value}>
        {props.value == null
            ? "N/A"
            : formatPriceChange(props.value, props.row.original.precision)
        }
    </StyledPriceChange>
}

const percentageChange = {
    Header: '% Change',
    accessor: 'percentageChange',
    style: { textAlign: 'right' },
    sortType: "basic",
    Cell: props => <StyledPriceChange value={props.value}>
        {props.value == null
            ? "N/A"
            : formatPriceChangePercentage(props.value)
        }
    </StyledPriceChange>
}

const intraDayRange = {
    Header: 'Day Range',
    accessor: 'Day Range',
    style: { width: '20%', textAlign: 'center' },
    disableSortBy: true,
    Cell: props => <RangeChart
        minValue={props.row.original.intraDayMinPrice}
        maxValue={props.row.original.intraDayMaxPrice}
        value={props.row.original.lastPrice} />
}

const intraYearRange = {
    Header: '52 Week Range',
    accessor: '52 Week Range',
    style: { width: '20%', textAlign: 'center' },
    disableSortBy: true,
    Cell: props => <RangeChart
        minValue={props.row.original.intraYearMinPrice}
        maxValue={props.row.original.intraYearMaxPrice}
        value={props.row.original.lastPrice} />
}

const useTableColumn = () => {
    return [code, fullname, lastPrice, change, percentageChange, intraDayRange, intraYearRange]
}

export default useTableColumn;