import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material'

import CalendarSummary from './CalenderSummary';

export default function Dashboard(props) {
    const {username} = props;
    const [email, setEmail] = React.useState("");
    useEffect(() => {
        const api = new API();

        async function getEmail() {
            const userJSONString = await api.userWithUsername(username);
            console.log(`user from the DB ${JSON.stringify(userJSONString)}`);
            setEmail(userJSONString.data[0]['email']);
        }

        getEmail();
    }, []);

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
            height: 50,
            alignItems: 'center'
        }}>
            <Typography align="center" fontSize={30}>
                Dashboard
            </Typography>
        </Box>
        <Box sx={{
            width: '100%',
            height: 20,
            alignItems: 'center'
        }}>
            <Typography>
                Appointments Next 7 Days:
            </Typography>
        </Box>
        <Box sx={{
            width: '100%',
            height: 70,
            alignItems: 'center',
            mb: 1
        }}>
            <CalendarSummary username={username} />
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