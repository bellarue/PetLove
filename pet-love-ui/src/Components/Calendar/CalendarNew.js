import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material'
import Calendar from 'react-calendar';

export default function CalendarNew(props) {
    const {username} = props;
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const api = new API();

        async function getEmail() {
            const userJSONString = await api.userWithUsername(username);
            console.log(`user from the DB ${JSON.stringify(userJSONString)}`);
            setEmail(userJSONString.data[0]['email']);
        }

        getEmail();
    }, []);
    useEffect(() => {
        if( email === '' ){
            return;
        }
        const temp = new Date();
        let date = "";
        let month = temp.getMonth()+1;
        date = temp.getFullYear() + '-' + month + '-' + temp.getDate();
       setDate(date);
    }, [email]);

    return <Fragment>
        <Box sx={{
            width: '100%',
            height: 600,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Calendar onChange={setDate} value={date} />
        </Box>
    </Fragment>
}