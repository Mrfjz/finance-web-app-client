import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Link from '../shared/Link';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import axios from '../api/instruments';
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
    const label = 'Instrument';

    return (
        <Autocomplete
            disablePortal
            // value={searchWord}
            id="combo-box-demo"
            options={data || []}
            clearOnEscape={true}
            sx={{ width: 300 }}
            onChange={(e, value: any, reason) => {
                if (reason === 'selectOption') {
                    setSearchWord({ label: '' });
                    navigate(`/quote/${value.code}`);
                }
            }}
            renderInput={(params) => <TextField {...params} label={label} />}
        />
    );
};

export default SearchBar;
