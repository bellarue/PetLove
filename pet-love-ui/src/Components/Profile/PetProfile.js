import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Grid, Button} from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Edit from './Edit';
import AddMealtime from './AddMealtime';
import AddMedication from './AddMedication';
import AddParent from './AddParent';
import AddSitter from './AddSitter';
import AddAllergy from './AddAllergy';

const mealsTableAttributes = [
    {
        title: 'Time',
        attributeDBName: 'time',
        align: 'left'
    },
    {
        title: 'Type',
        attributeDBName: 'type',
        align: 'left'
    },
    {
        title: 'Amount',
        attributeDBName: 'amount',
        align: 'left'
    }
];

const usersTableAttributes = [
    {
        title: 'First Name',
        attributeDBName: 'fname',
        align: 'left'
    },
    {
        title: 'Last Name',
        attributeDBName: 'lname',
        align: 'left'
    },
    {
        title: 'Email',
        attributeDBName: 'email',
        align: 'left'
    },
    {
        title: 'Username',
        attributeDBName: 'username',
        align: 'left'
    }
];

const medsTableAttributes = [
    {
        title: 'Name',
        attributeDBName: 'name',
        align: 'left'
    },
    {
        title: 'Start Date',
        attributeDBName: 'startDate',
        align: 'left'
    },
    {
        title: 'Veterinarian',
        attributeDBName: 'veterinarian',
        align: 'left'
    },
    {
        title: 'Type',
        attributeDBName: 'type',
        align: 'left'
    },
    {
        title: 'Dosage',
        attributeDBName: 'dosage',
        align: 'left'
    },
    {
        title: 'Admin Method',
        attributeDBName: 'admin_method',
        align: 'left'
    }
];

const RelatedUsers = props => {
    const {users} = props;
    const TRow = ({userObject}) => {
        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                usersTableAttributes.map((attr, idx) =>
                    <TableCell key={idx}
                               align={attr.align}>
                        {
                            userObject[attr.attributeDBName]
                        }
                    </TableCell>)
            }
        </TableRow>
    }
    return <Fragment>
        {
            users.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="related users table">
                        <TableHead>
                            <TableRow>
                                {
                                    usersTableAttributes.map((attr, idx) =>
                                        <TableCell  key={idx}
                                                    align={attr.align}>
                                            {attr.title}
                                        </TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users.map((user, idx) => (
                                    <TRow userObject={user} key={idx}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </Fragment>
}

const Mealtimes = props => {
    const {meals} = props;
    const TRow = ({mealtimeObject}) => {
        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                mealsTableAttributes.map((attr, idx) =>
                    <TableCell key={idx}
                               align={attr.align}>
                        {
                            mealtimeObject[attr.attributeDBName]
                        }
                    </TableCell>)
            }
        </TableRow>
    }
    return <Fragment>
        {
            meals.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="mealtime table">
                        <TableHead>
                            <TableRow>
                                {
                                    mealsTableAttributes.map((attr, idx) =>
                                        <TableCell  key={idx}
                                                    align={attr.align}>
                                            {attr.title}
                                        </TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                meals.map((meal, idx) => (
                                    <TRow mealtimeObject={meal} key={idx}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </Fragment>
}

const Medications = props => {
    const {meds} = props;
    const TRow = ({medicationObject}) => {
        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                medsTableAttributes.map((attr, idx) =>
                    <TableCell key={idx}
                               align={attr.align}>
                        {
                            medicationObject[attr.attributeDBName]
                        }
                    </TableCell>)
            }
        </TableRow>
    }
    return <Fragment>
        {
            meds.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="medication table">
                        <TableHead>
                            <TableRow>
                                {
                                    medsTableAttributes.map((attr, idx) =>
                                        <TableCell  key={idx}
                                                    align={attr.align}>
                                            {attr.title}
                                        </TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                meds.map((med, idx) => (
                                    <TRow medicationObject={med} key={idx}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </Fragment>
}

const allergiesString = (allergies) => {
    let a = "";
    for( let allergy of allergies ){
        a = a + allergy['allergy'] + ", ";
    }
    return a.slice(0,a.length-2); //slice to remove extra ", "
}

export default function PetProfile(props) {
    const {pet, vet, friends} = props; //pet is a pet object
    console.log(`this is pet: ${JSON.stringify(pet)}`);
    console.log(`this is vet: ${JSON.stringify(vet)}`);
    const [mealtimes, setMealtimes] = React.useState([]);
    const [allergies, setAllergies] = React.useState([]);
    const [owners, setOwners] = useState([]);
    const [sitters, setSitters] = useState([]);
    const [meds, setMeds] = useState([]);
    const [notes, setNotes] = useState(pet['notes']);

    useEffect(() => {
        if( notes === '' || notes === pet['notes'] ){ //is empty or hasnt changed
            return;
        }
        const api = new API();

        async function postNotes() {
            const notesUpdateResults = api.changePetNotes(notes, pet['petID']);
            console.log(`changing notes ${JSON.stringify(notesUpdateResults)}`);
        }

        postNotes();
    }, [notes]);

    useEffect(() => {
        const api = new API();

        async function getOwners() {
            const ownersJSONString = await api.usersByPet(pet['petID']);
            console.log(`owners from the DB ${JSON.stringify(ownersJSONString)}`);
            setOwners(ownersJSONString.data);
        }

        getOwners();
    }, []);

    useEffect(() => {
        const api = new API();

        async function getSitters() {
            const sittersJSONString = await api.sittersByPet(pet['petID']);
            console.log(`sitters from the DB ${JSON.stringify(sittersJSONString)}`);
            setSitters(sittersJSONString.data);
        }

        getSitters();
    }, []);

    useEffect(() => {
        const api = new API();

        async function getAllergies() {
            const allergiesJSONString = await api.allergiesByPetID(pet['petID']);
            console.log(`allergies from the DB ${JSON.stringify(allergiesJSONString)}`);
            setAllergies(allergiesJSONString.data);
        }

        getAllergies();
    }, []);

    useEffect(() => {
        const api = new API();

        async function getMealtimes() {
            console.log(`petID is ${pet['petID']}`);
            const mealsJSONString = await api.mealtimesWithPetID(pet['petID']);
            console.log(`mealtimes from the DB ${JSON.stringify(mealsJSONString)}`);
            setMealtimes(mealsJSONString.data);
        }

        getMealtimes();
    }, [pet]);

    useEffect(() => {
        const api = new API();

        async function getMeds() {
            console.log(`petID is ${pet['petID']}`);
            const medsJSONString = await api.medicationsByPet(pet['petID']);
            console.log(`medications from the DB ${JSON.stringify(medsJSONString)}`);
            setMeds(medsJSONString.data);
        }

        getMeds();
    }, [pet]);

    return <Fragment>
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{
                width: '100%',
                height: 35,
                alignItems: 'center' 
            }}>
                <Typography align="center" fontSize={25}>
                    {pet['name']}
                </Typography>
            </Box>
            <Box sx={{
                width: '100%',
                height: 100,
                display: 'flex',
                flexDirection: 'column',
                border: 1,
                mb: 1
            }}>
                <Box sx={{
                    width: '100%',
                    height: 21,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Typography>
                        Notes:
                    </Typography>
                    <Edit label={"Notes"} value={notes} setValue={(notes)=>setNotes(notes)} />
                </Box>
                
                <Typography>
                    {pet['notes']}
                </Typography>
            </Box>
            
            <Box sx={{
                width: '100%',
                maxHeight: 50,
                alignItems: 'center',
                border: 1,
                mb: 1
            }}>
                <Box sx={{
                    width: '100%',
                    height: 21,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Typography>
                        Allergies:
                    </Typography>
                    <AddAllergy petID={pet['petID']} />
                </Box>
                <Typography>
                    {allergiesString(allergies)}
                </Typography>

            </Box>
            <Box sx={{
                width: '100%',
                maxHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                border: 1,
                mb: 1
            }}>
                <Box sx={{
                    width: '100%',
                    height: 21,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Typography>
                        Mealtimes:
                    </Typography>
                    {/* <AddMealtime petID={pet['petID']} /> */}
                </Box>
                <Mealtimes meals={mealtimes} />
            </Box>
            <Box sx={{
                width: '100%',
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                border: 1,
                mb: 1,
                overflow: 'auto'
            }}>
                <Box sx={{
                    width: '100%',
                    height: 21,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Typography>
                        Medications:
                    </Typography>
                    {/* <AddMedication petID={pet['petID']} /> */}
                </Box>
                <Medications meds={meds} />
            </Box>
            <Box sx={{
                width: '100%',
                maxHeight: 150,
                display: 'flex',
                flexDirection: 'column',
                border: 1,
                mb: 1
            }}>
                <Box sx={{
                    width: '100%',
                    height: 21,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Typography marginLeft={0.5}>
                        Parents:
                    </Typography>
                    <AddParent petID={pet['petID']} friends={friends} />
                </Box>
                <RelatedUsers users={owners} />
            </Box>
            <Box sx={{
                width: '100%',
                maxHeight: 150,
                display: 'flex',
                flexDirection: 'column',
                border: 1,
                mb: 1
            }}>
                <Box sx={{
                    width: '100%',
                    height: 21,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Typography marginLeft={0.5}>
                        Sitters:
                    </Typography>
                    <AddSitter petID={pet['petID']} friends={friends} />
                </Box>
                <RelatedUsers users={sitters} />
            </Box>
            <Typography>
                Veterinarian:
            </Typography>
            <Box sx={{
                width: '100%',
                maxHeight: 50,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                border: 1
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
        </Box>
    </Fragment>
}