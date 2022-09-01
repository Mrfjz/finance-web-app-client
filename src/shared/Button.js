import styled from "styled-components"

const Btn = styled.button`
border: none;
border-radius: 6px;
font-weight: bold;
`

const BtnPrimary = styled(Btn)`
color: white;
background-color: #1877f2;
`

const BtnSuccess = styled(Btn)`
color: white;
background-color: #42b72a;
`

const BtnSecondary = styled(Btn)`
color: #4b4f56;
background-color: #e4e6eb;
`


export { BtnPrimary, BtnSuccess, BtnSecondary };