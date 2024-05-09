import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Grid, Button, ButtonGroup} from '@mui/material'
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import PetProfile from './PetProfile';
import AddPet from './AddPet';

const vetsTableAttributes = [
    {
        title: 'Name',
        attributeDBName: 'name',
        align: 'left'
    },
    {
        title: 'Email',
        attributeDBName: 'email',
        align: 'left'
    },
    {
        title: 'Phone Number',
        attributeDBName: 'phone_num',
        align: 'left'
    }
];

const Vets = props => {
    const {vets} = props;
    const TRow = ({vetObject}) => {
        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                vetsTableAttributes.map((attr, idx) =>
                    <TableCell key={idx}
                               align={attr.align}>
                        {
                            vetObject[attr.attributeDBName]
                        }
                    </TableCell>)
            }
        </TableRow>
    }
    return <Fragment>
        {
            vets.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="vet table">
                        <TableHead>
                            <TableRow>
                                {
                                    vetsTableAttributes.map((attr, idx) =>
                                        <TableCell  key={idx}
                                                    align={attr.align}>
                                            {attr.title}
                                        </TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                vets.map((vet, idx) => (
                                    <TRow vetObject={vet} key={idx}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        }
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
    const [friends, setFriends] = useState([]);
    const [updatePets, setUpdatePets] = useState(false);
    const [updateVets, setUpdateVets] = useState(false);

    useEffect(() => {
        if( email.length === 0 ){
            return;
        }
        const api = new API();

        async function getFriends() {
            const friendsJSONString = await api.friendsByUser(email);
            console.log(`friends from the DB ${JSON.stringify(friendsJSONString)}`);
            setFriends(friendsJSONString.data);
        }

        getFriends();
    }, [email]);

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
        setUpdateVets(false);
    }, [email, updateVets]);

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
        setUpdatePets(false);
    }, [email, updatePets]);

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
        setUpdatePets(false);
    }, [email, updatePets]);

    const PetsList = props => {
        const {pets,name} = props; //need to get this from api route
        console.log(`rendering pets list, ${JSON.stringify(pets)}`);
        const handleListItemClick = (event, index) => {
            console.log(`handleListItemClick called, index is ${index}`);
            setSelectedIndex(index);
        };
        return (
            <List component="nav"
                aria-label="list of pets" sx={{
                width: 100,
                maxHeight: 300,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'scroll',
                mr: 2,
                border: 1
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
                <Divider/>
            </List>
        )
    }

    const getPetProfile = () => {
        if( chosenList === 0 ){
            const pet = pets[selectedIndex];
            return pet;
        }
        const pet = sittingPets[selectedIndex];
        return pet;
    }

    const display = () => {
        if( selectedIndex === -1 ){
            return <Box sx={{
                width: '100%',
                maxHeight: 200,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Typography>
                    Veterinarians:
                </Typography>
                <Vets vets={vets} />
            </Box>
        }
        return <PetProfile petID={getPetProfile().petID} friends={friends} chosenList={chosenList} email={email} />
    }

    const chooseList = () => {
        if( chosenList === 0 ){
            return <PetsList pets={pets} name={'My Pets'} />
        }
        return <PetsList pets={sittingPets} name={'Sitting'} />
    }

    return <Fragment>
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
            <AddPet email={email} setUpdatePets={(value)=>setUpdatePets(value)} setUpdateVets={(value)=>setUpdateVets(value)} />
        </Box>
        <Box sx={{
            width: '100%',
            height: '100%',
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
                            onClick={() => {
                                setChosenList(0);
                                setSelectedIndex(-1);
                            }}
                        >My Pets</Button>
                        <Button
                            size="small"
                            onClick={() => {
                                setChosenList(1);
                                setSelectedIndex(-1);
                            }}
                        >Sitting</Button>
                    </ButtonGroup>
                </Box>
                {chooseList()}
            </Box>
            {display()}
        </Box>

    </Fragment>
}