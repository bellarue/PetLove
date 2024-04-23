import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material'
import TextField from '@mui/material/TextField';
import SearchBar from "material-ui-search-bar";

export default function Search() {
    const [input, setInput] = useState({value: ""});

    return (
    //   <Box
    //     component="form"
    //     sx={{
    //       '& .MuiTextField-root': { m: 1, width: '25ch' },
    //     }}
    //     noValidate
    //     autoComplete="off"
    //   >
    //       <TextField
    //         id="filled-search"
    //         label="Search field"
    //         type="search"
    //         variant="filled"
    //       />
    //   </Box>

    <SearchBar
        value={this.input.value}
        onChange={(newValue) => this.setInput({ value: newValue })}
        onRequestSearch={() => doSomethingWith(this.input.value)}
    />
    );
  }