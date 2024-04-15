import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material'

import CalendarSummary from './CalenderSummary';

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
            height: 70,
            alignItems: 'center',
            border: 1,
            mb: 1
        }}>
            <CalendarSummary />
        </Box>
        <Box sx={{
            width: '100%',
            height: 70,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: 70,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                border: 1,
                mr: 1
            }}>
                <Typography>
                    friend requests
                </Typography>
            </Box>
            <Box sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                border: 1
            }}>
                <Typography>
                    messages previews
                </Typography>
            </Box>
        </Box>
    </Box>
    
</Fragment>
}