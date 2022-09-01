import styled from "styled-components"

const StyledText = styled.span`
float: left;
/* width: 10em; */
`

const StyledCode = styled(StyledText)`
font-weight: bold;
/* width: 15em; */
`

const StyledNumber = styled.span`
float: right;
`

const StyledPrice = styled(StyledNumber)`
font-weight: bold;
/* width: 0%; */
`

const StyledPriceChange = styled(StyledNumber)`
color: ${props => {
        if (props.value == null) { return 'black' }
        else { return props.value >= 0 ? 'green' : 'red' }
    }};
`

const StyledIcon = styled.img`
width: 20px;
height: 20px;
`

export { StyledText, StyledCode, StyledNumber, StyledPrice, StyledPriceChange, StyledIcon };
