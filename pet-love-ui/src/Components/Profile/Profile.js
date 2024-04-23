import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Grid, Button, ButtonGroup} from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import PetProfile from './PetProfile';
import AddPet from './AddPet';

const Vets = props => {
    const {vets} = props;

    return <Fragment>
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography align='center'>
                Veterinarians
            </Typography>
            {
                vets.map((vet,idx) => 
                    <Box sx={{
                        width: '100%',
                        height: 50,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <Typography>
                            {vet['name']}
                        </Typography>
                        <Typography>
                            {vet['email']}
                        </Typography>
                        <Typography>
                            {vet['phone_num']}
                        </Typography>
                    </Box>
                )
            }
            
        </Box>
    </Fragment>
}

export default function Profile(props) {
    const {username, idx} = props;
    console.log(`username in profile is ${username}`);
    console.log(`idx is ${idx}`)
    const [selectedIndex, setSelectedIndex] = React.useState(idx);
    const [pets, setPets] = React.useState([]);
    const [sittingPets, setSittingPets] = useState([]);
    const [email, setEmail] = React.useState("");
    const [vets, setVets] = React.useState([]);
    const [chosenList, setChosenList] = useState(0);

    useEffect(() => {
        if(email === ""){
            return;
        }
        const api = new API();

        async function getVets() {
            const vetsJSONString = await api.vetsByUser(email);
            console.log(`vets from the DB ${JSON.stringify(vetsJSONString)}`);
            setVets(vetsJSONString.data);
        }

        getVets();
    }, [email]);

    useEffect(() => {
        const api = new API();

        async function getEmail() {
            const userJSONString = await api.userWithUsername(username);
            console.log(`user from the DB ${JSON.stringify(userJSONString)}`);
            setEmail(userJSONString.data[0]['email']);
        }

        getEmail();
    }, []);
    console.log(`email in profile is ${email}`);
    useEffect(() => {
        if( email === '' ){
            return;
        }
        const api = new API();
        async function getPets() {
            const petsJSONString = await api.petsByOwner(email);
            console.log(`pets from the DB ${JSON.stringify(petsJSONString)}`);
            setPets(petsJSONString.data);
        }

        getPets();
    }, [email]);

    useEffect(() => {
        if( email === '' ){
            return;
        }
        const api = new API();
        async function getSittingPets() {
            const sitPetsJSONString = await api.petsBySitter(email);
            console.log(`sitting pets from the DB ${JSON.stringify(sitPetsJSONString)}`);
            setSittingPets(sitPetsJSONString.data);
        }

        getSittingPets();
    }, [email]);

    const PetsList = props => {
        const {pets,name} = props; //need to get this from api route
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
                <ListSubheader>
                    {name}
                </ListSubheader>
                <Divider/>
                {
                    pets.map((pet,idx) =>
                        <ListItemButton 
                            key={idx}
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

    const getVet = () => {
        const vetEmail = pets[selectedIndex]['veterinarian'];
        for( let vet of vets ){
            if( vet['email'] === vetEmail ){
                return vet; //this pet has an assigned vet
            }
        }
        return null; //no assigned vet
    }

    const display = () => {
        if( selectedIndex === -2 ) {
            return <AddPet />
        }
        if( selectedIndex === -1 ){
            return <Typography>
                summary?
            </Typography>
        }
        return <PetProfile pet={getPetProfile()} vet={getVet()} />
    }

    const chooseList = () => {
        if( chosenList === 0 ){
            return <PetsList pets={pets} name={'My Pets'} />
        }
        return <PetsList pets={sittingPets} name={'Sitting'} />
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
                height: 50,
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center'
            }}>
                <Typography fontSize={30} justifyContent={'center'}>
                    My Profile
                </Typography>
                <Button
                    onClick={() => {
                    setSelectedIndex(-2);
                }}>
                    <AddCircleIcon/>
                </Button>
            </Box>
            <Box sx={{
                width: '100%',
                height: 500,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "start"
            }}>
                <Box sx={{
                    width: 130,
                    height: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "start",
                    mr: 1
                }}>
                    <Box sx={{
                        width: '100%',
                        height: 10,
                        justifyContent: 'start',
                        mb: 6
                    }}>
                        <ButtonGroup variant="outlined" aria-label="Basic button group">
                            <Button
                                size="small"
                                onClick={() => {setChosenList(0)}}
                            >My Pets</Button>
                            <Button
                                size="small"
                                onClick={() => {setChosenList(1)}}
                            >Sitting</Button>
                        </ButtonGroup>
                    </Box>
                    {chooseList()}
                </Box>
                {display()}
            </Box>
            <Box sx={{
                width: '100%',
                height: 50,
                alignItems: 'center'
            }}>
                <Vets vets={vets} />
            </Box>

        </Box>
    )
}