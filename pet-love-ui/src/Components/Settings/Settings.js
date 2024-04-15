import React, {Fragment, useState, useEffect} from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import AccountSettings from './AccountSettings';
import Logout from './Logout';
import ManagePets from './ManagePets';
import VisualAndAccessibility from './VisualAccessibility';

export default function Settings (props) {
    const {username, logoutAction} = props;
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const userClick = () => {
        alert("username selected");
    }

    const handleClick = (idx) => {
        setSelectedIndex(idx);
    }

    const Menu = () => {
        return (
          <Box sx={{ width: '100%', maxWidth: 200, bgcolor: 'background.paper' }}>
            <List>
            <ListItem disablePadding>
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={() => handleClick(0)}
                >
                    {/* need user icons */}
                    <ListItemText primary={username} />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={() => handleClick(1)}
                >
                    <ListItemText primary="Account Settings" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={() => handleClick(2)}
                >
                    <ListItemText primary="Visual / Accessibility" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={() => handleClick(3)}
                >
                    <ListItemText primary="Manage Pets" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton
                    selected={selectedIndex === 4}
                    onClick={() => handleClick(4)}
                >
                    <ListItemText primary="Log Out" />
                </ListItemButton>
            </ListItem>
            </List>
          </Box>
        );
    }

    const display = () => {
        if( selectedIndex === 1 ){
            return <AccountSettings />
        }
        if( selectedIndex === 2 ){
            return <VisualAndAccessibility />
        }
        if( selectedIndex === 3 ){
            return <ManagePets />
        }
        if( selectedIndex === 4 ){
            return <Logout logoutAction={logoutAction} />
        }
    }

    return (
        <Fragment>
            <Box sx={{
                width: '100%',
                height: 700,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box sx={{
                    width: "100%",
                    height: 50,

                    fontSize: 30,
                    fontWeight: 500,
                    justifyContent: "center",
                    alignContent: "center",
                    textAlign: "center",
                    bgcolor: 'primary.main',
                }}>
                    Settings
                </Box>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Menu />
                    {display()}
                </Box>
            </Box>
        </Fragment>
    )
}
