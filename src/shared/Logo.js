import React from "react";
import styled from "styled-components";
import logo from './images/logo.png';
import { useNavigate } from "react-router-dom";

const StyledLogo = styled.img`
width: 240px;
margin-bottom: 1em;
cursor: pointer;
`

function Logo({ ...props }) {
    const nativate = useNavigate();
    return (
        <StyledLogo {...props} src={logo} onClick={() => nativate('/')}/>
    )
}

export default Logo;