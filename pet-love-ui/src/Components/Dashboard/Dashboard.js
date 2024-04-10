import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material'

export default function Dashboard(props) {
    return <Fragment>
    <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
        <Box sx={{
            width: '100%',
            height: 30,
            alignItems: 'center'
        }}>
            <Typography align="center">
                Dashboard
            </Typography>
        </Box>
        <Box sx={{
            width: '100%',
            height: 50,
            alignItems: 'center'
        }}>
            <Typography align="center">
                Calendar
            </Typography>
        </Box>
    </Box>
    
</Fragment>
}