import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material'

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const Appts = props => {
    
}

const Day = props => {
    const {appts, date} = props;
    const numAppts = appts.length;
    return (
        <Box sx={{
            width: 10,
            height: 10,
            display: 'flex',
            flexDirection: 'column',
            border: 1
        }}>
            <Typography variant='h1'>
                {date}
            </Typography>
            <Typography align='center'>
                {date}
            </Typography>
        </Box>
        
    )
}

const Month = props => {
    const {days} = props; //array of arrays of appointments, one array for each day
    const numDays = days.length;
    const boxes = new Array(numDays);

    return <Fragment>
        <Box sx={{
            width: '100%',
            height: '100%',
            alignItems: 'center'
        }}>
            <Grid container columns={7}
                sx={{
                    width: '100%',
                    height: '100%'
            }}>
                {
                    days.map((day, idx) =>
                        <Grid item xs={1}
                        key={idx}
                        sx={{margin: 0,
                                padding: 0
                            }}
                        >
                            <Day appts={day} date={idx+1}/>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    </Fragment>
}

export default function Calendar(props) {
    const {username} = props;
    const [date, setDate] = useState(new Date());
    const monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];
    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May',]
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = [date.getFullYear(), date.getFullYear()+1, date.getFullYear()+2, date.getFullYear()+3, date.getFullYear()+4]; //FIXME: idk how to do this
    const [selectedIndexMonth, setSelectedIndexMonth] = React.useState(0);
    const [selectedIndexYear, setSelectedIndexYear] = React.useState(0);
    const [eachDate, setEachDate] = React.useState([]);
    const [email, setEmail] = React.useState("");

    useEffect(() => {
        const api = new API();

        async function getEachDate() {
            let month = [];
            for( let i = 1; i <= monthDays[selectedIndexMonth]; i++ ){
                const dateJSONString = await api.appointmentsWithUserAndDate(email, date);
                console.log(`appts from the DB ${JSON.stringify(dateJSONString)}`);
                month.push(dateJSONString.data);
            }
            setEachDate(month);
        }

        getEachDate();
    }, [selectedIndexMonth]);

    useEffect(() => {
        const api = new API();

        async function getEmail() {
            const userJSONString = await api.userWithUsername(username);
            console.log(`user from the DB ${JSON.stringify(userJSONString)}`);
            setEmail(userJSONString.data[0]['email']);
        }

        getEmail();
    }, []);

    const onClickDayCallback = (appts) => {

    }

    function SplitButton(props) {
        const {options, selectedIndex, setSelectedIndex} = props;
        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
      
        const handleClick = () => {
          console.info(`You clicked ${options[selectedIndex]}`);
        };
      
        const handleMenuItemClick = (event, index) => {
          setSelectedIndex(index);
          setOpen(false);
        };
      
        const handleToggle = () => {
          setOpen((prevOpen) => !prevOpen);
        };
      
        const handleClose = (event) => {
          if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
          }
      
          setOpen(false);
        };
      
        return (
          <React.Fragment>
            <ButtonGroup
              variant="contained"
              ref={anchorRef}
              aria-label="Button group with a nested menu"
            >
              <Button onClick={handleClick}>{options[selectedIndex]}</Button>
              <Button
                size="small"
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Popper
              sx={{
                zIndex: 1,
              }}
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="split-button-menu" autoFocusItem>
                        {options.map((option, index) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </React.Fragment>
        );
    }
    return <Fragment>
        <Box sx={{
            width: '100%',
            height: 600,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: '100%',
                height: 50,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <SplitButton options={months} selectedIndex={selectedIndexMonth} setSelectedIndex={(idx)=>setSelectedIndexMonth(idx)} />
                <SplitButton options={years} selectedIndex={selectedIndexYear} setSelectedIndex={(idx)=>setSelectedIndexYear(idx)} />
            </Box>
            <Month days={eachDate} />
        </Box>
    </Fragment>
}