import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material'

const ApptsList = (props) => {
    const {appts} = props; //array of appointment objects
    return (
      <Box sx={{ 
            width: '100%', 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
        {/* <List>
            {
                appts.map((appt, idx) =>
                    <ListItem disablePadding
                        key={idx}>
                        <ListItemText primary={appt['type']} />
                    </ListItem>
                )
            }
            
        </List> */}
        <Typography>
            {appts.length}
        </Typography>
      </Box>
    );
}

export default function CalendarSummary(props) {
    const {username} = props;
    const [email, setEmail] = React.useState("");
    const [date, setDate] = useState("");
    const [today, setToday] = useState((new Date).getDate());
    const months = [31,28,31,30,31,30,31,31,30,31,30,31];
    const thisMonth = (new Date).getMonth();
    console.log(`date is ${date}`);
    const [appts, setAppts] = React.useState([]);

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

    useEffect(() => {
        if( date === '' ){
            return;
        }
        const api = new API();

        async function getAppts() {
            let numDays = months[thisMonth];
            let week = [];
            let tempDate = date;
            let dates = [];
            if( date[date.length-2] === '-' ){
                tempDate = date.slice(0,date.length-1);
            }
            else{
                tempDate = date.slice(0,date.length-2);
            }
            let j = today;
            for( let i = 0; i < 7; i++ ){
                if( j > numDays ) {
                    j = 1;
                }
                dates.push(j);
                j++;
            }
            for( let i of dates ){
                
                const dateJSONString = await api.appointmentsWithUserAndDate(email, tempDate+i);
                week.push(dateJSONString.data);
            }
            setAppts(week);

            // const dateJSONString = await api.appointmentsWithUserAndDate(email, date);
            // console.log(`appts from the DB ${JSON.stringify(dateJSONString)}`);
            // setAppts(dateJSONString.data);
        }

        getAppts();
    }, [date]);

    const getDay = (idx) => {
        if( idx + today > months[thisMonth] ){
            return idx + today - months[thisMonth];
        }
        return idx + today;
    }

    return <Fragment>
        <Box sx={{
            height: '100%',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'auto',
            position: 'relative'
        }}>
            {/* <Typography>
                calendar preview
            </Typography> */}
            <Grid container columns={7}
                sx={{
                    height: '100%',
                    width: '100%'
            }}>
                {
                    appts.map((day, idx) => 
                        <Grid item xs={1}
                            key={idx}
                            sx={{
                                margin: 0,
                                padding: 0
                        }}>
                            <Box sx={{
                                height: '100%',
                                width: 85,
                                display: 'flex',
                                flexDirection: 'column',
                                border: 1
                            }}>
                                <Typography marginLeft={0.5}>
                                    {getDay(idx)}
                                </Typography>
                                <ApptsList appts={day} />
                            </Box>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    </Fragment>
}