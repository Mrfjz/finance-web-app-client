import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const StyledLinkComponent = (props) => {
    return (
        <StyledLink {...props} />
    )
}

export default StyledLinkComponent;
