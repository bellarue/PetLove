import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material'
import ReactCalendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import ApptTable from './ApptTable';
import AddAppt from './AddAppt';

export default function Calendar(props) {
    const {username} = props;
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(new Date());
    const [appts, setAppts] = useState([]);
    const [petsOnAppts, setPetsOnAppts] = useState([]);
    const [deleteAppt, setDeleteAppt] = useState("");

    useEffect(() => {
        if( deleteAppt.length === 0 ) {
            return;
        }
        const api = new API();

        async function postDelete() {
            const deleteJSONString = await api.removeAppointment({apptID: deleteAppt});
            console.log(`delete appt results ${JSON.stringify(deleteJSONString)}`);
            setDeleteAppt("");
        }

        postDelete();
    }, [deleteAppt]);

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
    }, [date, email]);

    useEffect(() => {
        console.log(`in getPets, appts is ${JSON.stringify(appts)}`);
        if( appts.length === 0 ) {
            return;
        }
        const pets = [];
        const api = new API();
        async function getPets(apptID) {
            const petsJSONString = await api.petsOnAppt(apptID);
            console.log(`pets from the DB ${JSON.stringify(petsJSONString)}`);
            return petsJSONString;
        }
        for( let appt of appts ) {
            const petsJSONString = getPets(appt['apptID']);
            if( petsJSONString.data == null ){
                pets.push([]);
            }
            else{
                pets.push(petsJSONString.data);
            }
        }
        setPetsOnAppts(pets);
    }, [date]);

    return <Fragment>
        <Box sx={{
            width: '100%',
            maxHeight: 600,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <ReactCalendar href='react-calendar/dist/Calendar.css' calendarType='gregory' value={date} onChange={(value, event) => setDate(value)} />
            <Typography align='center' fontSize={20} marginTop={1}>
                {date.toDateString()}
            </Typography>
            <ApptTable appts={appts} petsOnAppts={petsOnAppts} setDeleteAppt={(apptID)=>setDeleteAppt(apptID)} />
        </Box>
    </Fragment>
}