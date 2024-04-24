import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material'
import ReactCalendar from 'react-calendar';

const ApptsView = props => {
    const {date, appts} = props;

    const showDate = () => {
        return date;
    }

    return <Fragment>
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Typography>
                {showDate()}
            </Typography>
        </Box>
    </Fragment>
}

export default function Calendar(props) {
    const {username} = props;
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(new Date());
    const [appts, setAppts] = useState([]);

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
        if( email === "" ){
            return;
        }
        let temp = "";
        let month = date.getMonth()+1;
        temp = date.getFullYear() + '-' + month + '-' + date.getDate();
        console.log(`date is ${temp}`);
        const api = new API();

        async function getAppts() {
            const apptsJSONString = await api.appointmentsWithUserAndDate(email, temp);
            console.log(`appts from the DB ${JSON.stringify(apptsJSONString)}`);
            setAppts(apptsJSONString.data);
        }

        getAppts();
    }, [date]);

    return <Fragment>
        <Box sx={{
            width: '100%',
            height: 600,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <ReactCalendar onChange={(value) => setDate(value)} value={date} calendarType={"gregory"} />
            <ApptsView date={date} appts={appts} />
        </Box>
    </Fragment>
}