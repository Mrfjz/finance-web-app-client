import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Link from '../shared/Link';
import Logo from "../shared/Logo";
import validator from 'validator';
import { Page, Form, FormContent, Title, Input, InputError, ErrMsg } from "../shared/Form";
import { BtnSuccess } from '../shared/Button';
import axios from '../api/axios';
import { useNavigate } from "react-router-dom";


const FirstNameInput = styled(Input)`
width: 49%;
float: left;
`

const LastNameInput = styled(Input)`
width: 49%;
float: right;
`

const BtnSignup = styled(BtnSuccess)`
width: 50%;
height: 50px;
margin: 10px 10px;
`

const FirstNameError = styled(InputError)`
width: 49%;
float: left;
`

const LastnameError = styled(InputError)`
width: 49%;
float: right;
`

function Signup() {
    const [firstName, setFirstname] = useState("Bob");
    const [firstNameErr, setFirstNameErr] = useState("");
    const firstNameRef = useRef(null);
    const [lastName, setLastname] = useState("Lam");
    const [lastNameErr, setLastnameErr] = useState("");
    const [email, setEmail] = useState("Bob123@hotmail.com");
    const [emailErr, setEmailErr] = useState("");
    const [password, setPassword] = useState("b1234567");
    const [passwordErr, setPasswordErr] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("b1234567");
    const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const nativate = useNavigate();

    useEffect(() => {
        firstNameRef.current.focus();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(firstName, lastName, email, password);

        let allPass = true;
        if (!firstName) {
            setFirstNameErr("Invalid fisrt name");
            allPass = false;
        } else {
            setFirstNameErr("");
        }
        if (!lastName) {
            setLastnameErr("Invalid last name");
            allPass = false;
        } else {
            setLastnameErr("");
        }

        if (!validator.isEmail(email)) {
            setEmailErr("Invalid email address");
            allPass = false;
        } else {
            setEmailErr("");
        }

        if (!validator.isStrongPassword(password, {
            minUppercase: 0,
            minSymbols: 0
        })) {
            setPasswordErr("Invalid password")
            allPass = false;
        } else {
            setPasswordErr("");
        }

        if (!password || password !== confirmPassword) {
            setConfirmPasswordErr("Password does not match")
            allPass = false;
        } else {
            setConfirmPasswordErr("");
        }

        if (!allPass) return;

        setSuccess(true);

        try {
            const response = await axios.post('/register',
                JSON.stringify({ firstName, lastName, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setErrMsg("");
            console.log(response.data);
            nativate("/");
        } catch (err) {
            if (err.response) {
                if (err.response.data && err.response.data.msg) {
                    setErrMsg(err.response.data.msg)
                } else {
                    console.log(err.response)
                    setErrMsg('Unexpected error')
                }
            } else {
                setErrMsg('No response from server')
            }
        }

    }


    return (
        <Page>
            <Logo />
            <Form>
                <FormContent>
                    <Title>Create a new account</Title>
                    <hr></hr>
                    {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
                    <FirstNameInput
                        ref={firstNameRef}
                        type='text'
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => {
                            setFirstname(e.target.value);
                            setFirstNameErr("");
                        }}
                        hasError={firstNameErr}
                    />
                    <LastNameInput
                        type='text'
                        placeholder='Last name'
                        value={lastName}
                        onChange={(e) => {
                            setLastname(e.target.value)
                            setLastnameErr("");
                        }}
                        hasError={lastNameErr}
                    />
                    {firstNameErr && <FirstNameError>{firstNameErr}</FirstNameError>}
                    {lastNameErr && <LastnameError>{lastNameErr}</LastnameError>}
                    <Input
                        type='email'
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setEmailErr("");
                        }}
                        hasError={emailErr}
                    />
                    {emailErr && <InputError>{emailErr}</InputError>}
                    <Input
                        type='password'
                        placeholder="New password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setPasswordErr("");
                        }}
                        hasError={passwordErr}
                    />
                    {passwordErr && <InputError>{passwordErr}</InputError>}
                    <Input
                        type='password'
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            setConfirmPasswordErr("");
                        }}
                        hasError={confirmPasswordErr}
                    />
                    {confirmPasswordErr && <InputError>{confirmPasswordErr}</InputError>}
                    <BtnSignup onClick={handleSubmit}>Sign Up</BtnSignup>
                    <div>
                        <Link to='/signin'>Already have an account?</Link>
                    </div>
                </FormContent>
            </Form>
        </Page>
    )
}

export default Signup

// ref: https://reactjsexample.com/a-starter-template-for-login-register-and-forgot-password-using-react/