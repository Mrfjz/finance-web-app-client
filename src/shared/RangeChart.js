import React from "react";
import styled from 'styled-components';

const RangeChart = styled.div`
padding-left: 5%;
padding-right: 5%;
`

const Container = styled.div`
display: flex;
justify-content: space-between;
`

const Value = styled.div`
`

const Label = styled.div`
`

const Box = styled.div`
width: 25%;
border: solid grey 0.5px;
height: 15px;
background-color: #f3f3f3;
`

const Circle = styled.div`
position: relative;
top: -12px;
left: ${props => props.left};
width: 10px;
height: 10px;
border-radius: 25px;
background: black;
`

const calLeftPosition = (minValue, maxValue, value) => {
    let ratio = (value - minValue) / (maxValue - minValue);
    ratio = Math.min(Math.max(ratio, 0.01), 0.95);
    return `${ratio * 100}%`;
}

const StyledRangeChart = ({ minValue, maxValue, value }) => {
    const leftPosition = calLeftPosition(minValue, maxValue, value);
    const formatter = new Intl.NumberFormat('us');
    return (
        <RangeChart>
            <Container>
                <Value>{formatter.format(minValue)}</Value>
                <Value>{formatter.format(maxValue)}</Value>
            </Container>
            <Container>
                {Array.from({ length: 4 }, (_, i) => <Box key={i} />)}
            </Container>
            <Circle left={leftPosition} />
        </RangeChart>
    )
}

export default StyledRangeChart;