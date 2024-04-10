import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';

import PetProfile from './PetProfile';

export default function Profile(props) {
    const {username, idx} = props;
    console.log(`username in profile is ${username}`);
    const [selectedIndex, setSelectedIndex] = React.useState(idx);
    const [pets, setPets] = React.useState([]);
    const [email, setEmail] = React.useState("");

    useEffect(() => {
        const api = new API();

        async function getEmail() {
            const userJSONString = await api.userWithUsername(username);
            console.log(`user from the DB ${JSON.stringify(userJSONString)}`);
            console.log(`email in profile is ${userJSONString.data[0]['email']}`);
            setEmail(userJSONString.data[0]['email']);
        }

        getEmail();
    }, []);

    useEffect(() => {
        const api = new API();

        async function getPets() {
            const petsJSONString = await api.petsByOwner(email);
            console.log(`pets from the DB ${JSON.stringify(petsJSONString)}`);
            setPets(petsJSONString.data);
        }

        getPets();
    }, []);

    const PetsList = props => {
        const {pets} = props; //need to get this from api route
        console.log(`rendering pets list, ${JSON.stringify(pets)}`);
        const handleListItemClick = (event, index) => {
            setSelectedIndex(index);
        };
        return (
            <List component="nav"
                aria-label="list of pets" sx={{
                width: 100,
                maxHeight: 300,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                mr: 2
            }}>
                <ListSubheader>Pets</ListSubheader>
                <Divider />
                {
                    pets.map((pet,idx) =>
                        <ListItemButton 
                            selected={selectedIndex === idx}
                            onClick={(event) => handleListItemClick(event, idx)}
                        >
                            <ListItemText primary={pet['name']} />
                        </ListItemButton>
                    )
                }
            </List>
        )
    }

    const getPetProfile = () => {
        const pet = pets[selectedIndex];
        return pet;
    }

    const display = () => {
        if( selectedIndex === -1 ){
            return <Typography>
                summary?
            </Typography>
        }
        return <PetProfile pet={getPetProfile()} />
    }

    return (
        <Box sx={{
            height: 750,
            width: '100%',
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Box sx={{
                width: '100%',
                height: 300,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "start"
            }}>
                <PetsList pets={pets} />
                {display()}
            </Box>
            <Box sx={{
                width: '100%',
                height: 50,
                alignItems: 'center'
            }}>
                <Typography>
                    veterinarians list
                </Typography>
            </Box>

        </Box>
    )
}