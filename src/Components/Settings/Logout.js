import React, {Fragment, useState, useEffect} from 'react';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Logout(props) {
    const {logoutAction} = props;
    
    return <Fragment>
        <Box sx={{
            width: '100%',
            height: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around'
        }}>
            <Typography align='center'>
                Are you sure you want to log out?
            </Typography>
            <Button variant="contained" onClick={()=>logoutAction()}>
                Log Out
            </Button>
        </Box>
    </Fragment>
    
}