import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material'

import Search from './Search';

export default function Social(props) {
    const {username} = props;
    const [email, setEmail] = useState('')

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
                height: 30,
                alignItems: 'center'
            }}>
                <Typography align="center">
                    Social
                </Typography>
            </Box>
            <Box sx={{
                width: '100%',
                height: 100,
                alignItems: 'center'
            }}>
                <Typography>
                    grid row, 2 items? profile picture (can change here?) and search username
                </Typography>
            </Box>
            <Search email={email} />
        </Box>
        
    </Fragment>
}