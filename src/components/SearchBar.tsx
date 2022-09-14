import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import axios from '../api/instruments';
import { Box, Grid } from '@mui/material';

interface IData
    extends Array<{
        code: string;
        label: string;
    }> {}

const SearchBar = () => {
    const [searchWord, setSearchWord] = useState({ label: '' });
    const [data, error, loading] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '/instruments'
    });
    const navigate = useNavigate();
    const label = 'Symbol / Name';

    return (
        <Autocomplete
            freeSolo
            options={data || []}
            clearOnEscape={true}
            sx={{ width: '80%' }}
            value={searchWord}
            onChange={(e, value: any, reason) => {
                if (reason === 'selectOption') {
                    navigate(`/quote/${value.code}`);
                }
            }}
            getOptionLabel={(option) => (option.code ? `${option.code} ${option.name}` : '')}
            renderOption={(props, option: any) => (
                <Box component="li" {...props}>
                    <Grid container>
                        <Grid xs={3}>{option.code}</Grid>
                        <Grid>{option.name}</Grid>
                    </Grid>
                </Box>
            )}
            renderInput={(params) => <TextField {...params} label={label} />}
        />
    );
};

export default SearchBar;
