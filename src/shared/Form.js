import styled from "styled-components"


const Page = styled.section`
display: flex;
flex-flow: column;
justify-content: center; 
align-items: center;
width: 100vw;
height: 100vh;
`
const Form = styled.form`
width: 450px;
box-shadow: 1px 1px 10px rgb(0 0 0 / 16%);
padding-top: 20px;
padding-bottom: 20px;
border-radius: 8px;
background-color: white;
text-align: center;
`

const FormContent = styled.div`
padding-left: 5%;
padding-right: 5%;
`

const Title = styled.h3`
margin-bottom: 1em;
font-size: 24px;
color: black;
font-weight: bold;
`


const Input = styled.input`
border-radius: 6px;
font-size: 17px;
padding: 14px 16px;
width: 100%;
border: 1px solid;
border-color: ${props => props.hasError ? 'red' : '#dddfe2'};
margin: 5px 0;
`

const InputError = styled.div`
color: red;
text-align: left;
padding-left: 10px;
`

const ErrMsg = styled.div`
width: 100%;
color: black;
background-color: #ffebe8;
border: 1px solid #dd3c10;
margin: 10px 0;
padding: 15px 0;
`


export { Page, Form, FormContent, Title, Input, InputError, ErrMsg };