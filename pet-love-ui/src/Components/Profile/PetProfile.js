import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

const allergiesString = (allergies) => {
    let a = "";
    for( let allergy of allergies ){
        a = a + allergy['allergy'] + ", ";
    }
    return a.slice(0,a.length-2); //slice to remove extra ", "
}

export default function PetProfile(props) {
    const {pet, vet} = props; //pet is a pet object
    console.log(`this is pet: ${JSON.stringify(pet)}`);
    const [mealtimes, setMealtimes] = React.useState([]);
    const [allergies, setAllergies] = React.useState([]);
    const [owners, setOwners] = useState([]);
    const [sitters, setSitters] = useState([]);

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

    return <Fragment>
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{
                width: '100%',
                height: 30,
                alignItems: 'center' 
            }}>
                <Typography align="center">
                    {pet['name']}
                </Typography>
            </Box>
            <Box sx={{
                width: '100%',
                height: 100,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                mb: 1
            }}>
                <Box sx={{
                    width: 100,
                    height: 100,
                    border: 1,
                    borderColor: '#000000',
                    mr: 1
                }}>
                    <Typography>
                        pet profile pic?
                    </Typography>
                </Box>
                <Box sx={{
                    width: '100%',
                    height: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    border: 1,
                    borderColor: '#000000'
                }}>
                    <Typography>
                        Notes:
                    </Typography>
                    <Typography>
                        {pet['notes']}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                width: '100%',
                height: 50,
                alignItems: 'center',
                border: 1,
                mb: 1
            }}>
                <Typography>
                    Allergies: {allergiesString(allergies)}
                </Typography>

            </Box>
            <Box sx={{
                width: '100%',
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                border: 1,
                mb: 1
            }}>
                <Typography>
                    Mealtimes:
                </Typography>
                <Mealtimes meals={mealtimes} />
            </Box>
            <Box sx={{
                width: '100%',
                height: 150,
                display: 'flex',
                flexDirection: 'column',
                border: 1,
                mb: 1
            }}>
                <Typography marginLeft={0.5}>
                    Parents:
                </Typography>
                <RelatedUsers users={owners} />
            </Box>
            <Box sx={{
                width: '100%',
                height: 150,
                display: 'flex',
                flexDirection: 'column',
                border: 1,
                mb: 1
            }}>
                <Typography marginLeft={0.5}>
                    Sitters:
                </Typography>
                <RelatedUsers users={sitters} />
            </Box>
            <Typography>
                Veterinarian:
            </Typography>
            <Box sx={{
                width: '100%',
                height: 50,
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