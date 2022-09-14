import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Button } from '@mui/material';
import SearchBar from './SearchBar';
import useSignout from '../hooks/useSignout';
import useAuth from '../hooks/useAuth';
import Logo from '../shared/Logo';
import styled from 'styled-components';
import Link from '../shared/Link';

const StyledLogo = styled(Logo)`
    width: 80%;
`;
export default function Navbar() {
    const signout = useSignout();
    const { auth } = useAuth();
    const navigate = useNavigate();

    return (
        <Box>
            <Grid container alignItems="center" marginLeft={'5vw'}>
                <Grid xs={2}>
                    <StyledLogo />
                </Grid>
                <Grid xs={8}>
                    <SearchBar />
                </Grid>
                <Grid xs={2}>
                    {!auth?.accessToken ? (
                        <Button variant="contained" onClick={() => navigate('/signin')}>
                            Sign in
                        </Button>
                    ) : (
                        <Button variant="contained" onClick={() => signout()}>
                            Sign out
                        </Button>
                    )}
                </Grid>
            </Grid>
            <Grid container marginLeft={'5vw'} marginRight={'5vw'} marginTop={'1vw'}>
                <Grid xs={3}>
                    <Link to="/portfolio">My Portfolio</Link>
                </Grid>
                <Grid xs={3}>
                    <Link to="/stocks">Stocks</Link>
                </Grid>
                <Grid xs={3}>
                    <Link to="/currencies">Currencies</Link>
                </Grid>
                <Grid xs={3}>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Grid>
            </Grid>
        </Box>
    );
}
