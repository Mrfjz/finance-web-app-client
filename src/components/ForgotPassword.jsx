import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Page, Form, FormContent, Title, Input, InputError } from "../shared/Form";
import { BtnPrimary, BtnSecondary } from '../shared/Button';
import { useNavigate } from "react-router-dom";
import Logo from "../shared/Logo";
import validator from 'validator';

const Label = styled.label`
font-size: 16px;
color: black;
display: block;
margin-bottom: 16px;
`

const BtnCancel = styled(BtnSecondary)`
width: 25%;
font-size: 16px;
line-height: 40px; // similar to padding
margin-left: 48%;
`

const BtnSearch = styled(BtnPrimary)`
width: 25%;
line-height: 40px; // similar to padding
margin: 10px 0;
margin-left: 2%;
`

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState(false);
    const emailRef = useRef(null);
    const nativate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        let allPass = true;

        if (!validator.isEmail(email)) {
            setEmailErr("Invalid email address");
            allPass = false;
        } else {
            setEmailErr("");
        }
        if (!allPass) return;
        console.log(email);
    }

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    return (
        <Page>
            <Logo />
            <Form>
                <FormContent>
                    <Title>Reset your password</Title>
                    <hr />
                    <div>
                        <Label>
                            Enter your email address and we will send you
                            a password reset link.
                        </Label>
                        <Input
                            ref={emailRef}
                            type='email'
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailErr("");
                            }}
                            hasError={emailErr}
                        />
                        {emailErr && <InputError>{emailErr}</InputError>}
                    </div>
                    <hr />
                    <BtnCancel onClick={() => nativate('/signin')}>Cancel</BtnCancel>
                    <BtnSearch onClick={handleSubmit}>Search</BtnSearch>
                </FormContent>
            </Form>
        </Page>
    )
}

export default ForgotPassword
