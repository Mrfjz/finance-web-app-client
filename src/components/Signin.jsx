import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Link from '../shared/Link';
import Logo from "../shared/Logo";
import { Page, Form, FormContent, Title, Input, InputError, ErrMsg } from "../shared/Form";
import { BtnPrimary, BtnSuccess } from '../shared/Button'
import usePasswordToggle from '../hooks/usePasswordToggle';
import axios from '../api/axios';
import validator from 'validator';
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";


const LineBreak = styled.h6`
width: 100%;
border-bottom: 1px solid #96999e;
line-height: 0.1em;
margin: 20px 0 20px;
font-size: 0.8em;

> span {
    background: #fff;
    padding: 0 10px;
    color: #96999e;
}
`

const BtnSignin = styled(BtnPrimary)`
width: 100%;
font-size: 20px;
height: 50px;
margin: 10px 0;
`

const BtnSignup = styled(BtnSuccess)`
width: 50%;
height: 50px;
`

const PasswordWrap = styled.div`
position: relative;
`

const PasswordToggleIcon = styled.span`
position: absolute;
top: 20px;
right: 16px;
z-index: 1000;
cursor: pointer;
`

function Signin() {
    const [email, setEmail] = useState("bob@hotmail.com")
    // const [email, resetEmail, emailAttributes] = useInput('email', 'bob@hotmail.com'); //useState("bob@hotmail.com");
    const [emailErr, setEmailErr] = useState("");
    const [password, setPassword] = useState("123456");
    const [passwordErr, setPasswordErr] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [passwordInputType, passwordToggleIcon] = usePasswordToggle();
    const emailRef = useRef(null);
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        emailRef.current.focus();
    }, [])


    async function handleSubmit(e) {
        e.preventDefault();
        let allPass = true;

        if (!validator.isEmail(email)) {
            setEmailErr("Invalid email address");
            allPass = false;
        } else {
            setEmailErr("");
        }

        if (!password) {
            setPasswordErr("This field can't be empty")
            allPass = false;
        } else {
            setPasswordErr("");
        }

        if (!allPass) return;

        try {
            const response = await axios.post('/login',
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setErrMsg("");
            setAuth(response.data);
            navigate(from, { replace: true });
        } catch (err) {
            if (err?.response?.data?.msg) {
                setErrMsg(err.response.data.msg)
            } else {
                console.log(err)
                setErrMsg('Unexpected error')
            }
        }
    }

    return (
        <Page>
            <Logo />
            <Form>
                <FormContent>
                    <Title>Log in to Finance</Title>
                    {/* {auth} */}
                    <hr></hr>
                    {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
                    <Input
                        ref={emailRef}
                        type='email'
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailErr("");
                        }}
                        hasError={emailErr}
                    />
                    {emailErr && <InputError>{emailErr}</InputError>}
                    <PasswordWrap>
                        <Input
                            type={passwordInputType}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordErr("");
                            }}
                            hasError={passwordErr}
                        />
                        <PasswordToggleIcon>
                            {passwordToggleIcon}
                        </PasswordToggleIcon>
                    </PasswordWrap>
                    {passwordErr && <InputError>{passwordErr}</InputError>}
                    <BtnSignin onClick={handleSubmit}>Log In</BtnSignin>
                    <div>
                        <Link to="/passwordrecovery">Forgotten password?</Link>
                    </div>
                    <LineBreak><span>or</span></LineBreak>
                    <BtnSignup onClick={() => navigate('/signup')}>Create New Account</BtnSignup>
                </FormContent>
            </Form>
        </Page>
    )
}

export default Signin
