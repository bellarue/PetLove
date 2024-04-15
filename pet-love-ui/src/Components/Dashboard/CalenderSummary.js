import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ApptsList = (props) => {
    const {appts} = props; //array of appointment objects
    return (
      <Box sx={{ 
            width: '100%', 
            maxWidth: 50, 
            bgcolor: 'background.paper',
            overflow: 'auto',
            position: 'relative',
            maxHeight: 50
        }}>
        <List>
            {
                appts.map((appt, idx) =>
                    <ListItem disablePadding>
                        <ListItemText primary={appt['type']} />
                    </ListItem>
                )
            }
            
        </List>
        
      </Box>
    );
  }

export default function CalendarSummary(props) {
    const {email} = props;
    const [date, setDate] = useState(new Date());
    const [appts, setAppts] = React.useState([]);
    //FIXME: need info from social

    useEffect(() => {
        const api = new API();

        async function getAppts() {
            // let week = [];
            // for( let i = 1; i <= 7; i++ ){
            //     const dateJSONString = await api.appointmentsWithUserAndDate(email, date);
            //     console.log(`appts from the DB ${JSON.stringify(dateJSONString)}`);
            //     week.push(dateJSONString.data);
            // }
            // setAppts(week);
            const dateJSONString = await api.appointmentsWithUserAndDate(email, date);
            console.log(`appts from the DB ${JSON.stringify(dateJSONString)}`);
            setAppts(dateJSONString.data);
        }

        getAppts();
    }, []);

    return <Fragment>
        <Box sx={{
            height: '100%',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'auto',
            position: 'relative'
        }}>
            <Typography>
                calendar preview
            </Typography>
            {
                appts.map((day, idx) => 
                    <Box sx={{
                        height: 50,
                        width: 50,
                        display: 'flex',
                        flexDirection: 'column',
                        border: 1
                    }}>
                        <Typography variant='h1'>
                            {idx}
                        </Typography>
                        <ApptsList appts={day} />
                    </Box>
                )
            }
        </Box>
    </Fragment>
}