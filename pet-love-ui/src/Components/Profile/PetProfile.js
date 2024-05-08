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

import EditNotes from './EditNotes';
import EditVet from './EditVet';
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
    },
    {
        title: 'Notes',
        attributeDBName: 'notes',
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
        attributeDBName: 'vname',
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
    console.log(`meds is ${JSON.stringify(meds)}`);
    const rows = [];
    for ( let med of meds ) {
        let startDate = med['startDate'].slice(0,10);
        console.log(`medication row`)
        rows.push({name: med['name'], startDate: startDate, veterinarian: med['vname'], type: med['type'], dosage: med['dosage'], admin_method: med['admin_method']});
    }
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">Veterinarian</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Dosage</TableCell>
                <TableCell align="left">Admin Method</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.startDate}</TableCell>
                  <TableCell align="left">{row.veterinarian}</TableCell>
                  <TableCell align="left">{row.type}</TableCell>
                  <TableCell align="left">{row.dosage}</TableCell>
                  <TableCell align="left">{row.admin_method}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

const allergiesString = (allergies) => {
    let a = "";
    for( let allergy of allergies ){
        a = a + allergy['allergy'] + ", ";
    }
    return a.slice(0,a.length-2); //slice to remove extra ", "
}

export default function PetProfile(props) {
    const {petID, friends, chosenList, email} = props; //pet is a pet object
    console.log(`this is pet: ${JSON.stringify(petID)}`);
    const [mealtimes, setMealtimes] = React.useState([]);
    const [allergies, setAllergies] = React.useState([]);
    const [owners, setOwners] = useState([]);
    const [sitters, setSitters] = useState([]);
    const [meds, setMeds] = useState([]);
    const [notes, setNotes] = useState([]);
    const [pet, setPet] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [vet, setVet] = useState([]);
    const [vetExists, setVetExists] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const api = new API();

        async function getPet() {
            const petJSONString = await api.petWithPetID(petID);
            console.log(`pet from the DB ${JSON.stringify(petJSONString)}`);
            setPet(petJSONString.data[0]);
        }

        getPet();
        setUpdate(false);
    }, [petID, update]);

    useEffect(() => {
        if( pet.length === 0 ){
            return;
        }
        if( pet['veterinarian'] === null ){
            return;
        }
        const api = new API();

        async function getVet() {
            const vetJSONString = await api.vetWithEmail(pet['veterinarian']);
            console.log(`vet from the DB ${JSON.stringify(vetJSONString)}`);
            setVet(vetJSONString.data[0]);
            setVetExists(true);
        }

        getVet();
    }, [pet]);

    useEffect(() => {
        if( pet.length === 0 ){
            return;
        }
        setNotes(pet['notes']);
        setName(pet['name']);
        setType(pet['type']);
    }, [pet]);

    useEffect(() => {
        if( pet.length === 0 ){
            return;
        }
        const api = new API();

        async function getOwners() {
            const ownersJSONString = await api.usersByPet(petID);
            console.log(`owners from the DB ${JSON.stringify(ownersJSONString)}`);
            setOwners(ownersJSONString.data);
        }

        getOwners();
    }, [pet]);

    useEffect(() => {
        if( pet.length === 0 ){
            return;
        }
        const api = new API();

        async function getSitters() {
            const sittersJSONString = await api.sittersByPet(petID);
            console.log(`sitters from the DB ${JSON.stringify(sittersJSONString)}`);
            setSitters(sittersJSONString.data);
        }

        getSitters();
    }, [pet]);

    useEffect(() => {
        if( pet.length === 0 ){
            return;
        }
        const api = new API();

        async function getAllergies() {
            const allergiesJSONString = await api.allergiesByPetID(petID);
            console.log(`allergies from the DB ${JSON.stringify(allergiesJSONString)}`);
            setAllergies(allergiesJSONString.data);
        }

        getAllergies();
    }, [pet]);

    useEffect(() => {
        if( pet.length === 0 ){
            return;
        }
        const api = new API();

        async function getMealtimes() {
            console.log(`petID is ${petID}`);
            const mealsJSONString = await api.mealtimesWithPetID(petID);
            console.log(`mealtimes from the DB ${JSON.stringify(mealsJSONString)}`);
            setMealtimes(mealsJSONString.data);
        }

        getMealtimes();
    }, [pet]);

    useEffect(() => {
        if( pet.length === 0 ){
            return;
        }
        const api = new API();

        async function getMeds() {
            console.log(`petID is ${petID}`);
            const medsJSONString = await api.medicationsByPet(petID);
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
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <Typography align="center" fontSize={25}>
                    {name}
                </Typography>
                <Typography align="center" fontSize={25} marginLeft={1}>
                    ({type})
                </Typography>
            </Box>
            <Box sx={{
                width: '100%',
                minHeight: 100,
                maxHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                border: 1,
                overflow: 'auto',
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
                        Notes:
                    </Typography>
                    {chosenList ? null : <EditNotes value={notes} setValue={(newNotes)=>setNotes(newNotes)} petID={petID} setUpdate={(value)=>setUpdate(value)} /> }
                </Box>
                
                <Typography marginLeft={0.5}>
                    {notes}
                </Typography>
            </Box>
            
            <Box sx={{
                width: '100%',
                maxHeight: 75,
                alignItems: 'center',
                border: 1,
                mb: 1
            }}>
                <Box sx={{
                    width: '100%',
                    height: 30,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography marginLeft={0.5}>
                        Allergies:
                    </Typography>
                    {chosenList ? null : <AddAllergy petID={petID} setUpdate={(value)=>setUpdate(value)} />}
                </Box>
                <Typography marginLeft={0.5}>
                    {allergiesString(allergies)}
                </Typography>

            </Box>
            <Box sx={{
                width: '100%',
                maxHeight: 225,
                display: 'flex',
                flexDirection: 'column',
                border: 1,
                mb: 1
            }}>
                <Box sx={{
                    width: '100%',
                    height: 30,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography marginLeft={0.5}>
                        Mealtimes:
                    </Typography>
                    {chosenList ? null : <AddMealtime petID={petID} setUpdate={(value)=>setUpdate(value)} /> }
                </Box>
                <Mealtimes meals={mealtimes} />
            </Box>
            <Box sx={{
                width: '100%',
                maxHeight: 225,
                display: 'flex',
                flexDirection: 'column',
                border: 1,
                mb: 1,
                overflow: 'auto'
            }}>
                <Box sx={{
                    width: '100%',
                    height: 30,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography marginLeft={0.5}>
                        Medications:
                    </Typography>
                    {chosenList ? null : <AddMedication petID={petID} setUpdate={(value)=>setUpdate(value)} />}
                </Box>
                {meds.length !== 0 ? <Medications meds={meds} /> : null}
            </Box>
            <Box sx={{
                width: '100%',
                maxHeight: 175,
                display: 'flex',
                flexDirection: 'column',
                border: 1,
                mb: 1
            }}>
                <Box sx={{
                    width: '100%',
                    height: 30,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography marginLeft={0.5}>
                        Parents:
                    </Typography>
                    {chosenList ? null : <AddParent petID={petID} friends={friends} setUpdate={(value)=>setUpdate(value)} />}
                </Box>
                <RelatedUsers users={owners} />
            </Box>
            <Box sx={{
                width: '100%',
                maxHeight: 175,
                display: 'flex',
                flexDirection: 'column',
                border: 1,
                mb: 1
            }}>
                <Box sx={{
                    width: '100%',
                    height: 30,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography marginLeft={0.5}>
                        Sitters:
                    </Typography>
                    {chosenList ? null : <AddSitter petID={petID} friends={friends} setUpdate={(value)=>setUpdate(value)} /> }
                </Box>
                <RelatedUsers users={sitters} />
            </Box>
            <Box sx={{
                    width: '100%',
                    height: 30,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                <Typography>
                    Veterinarian:
                </Typography>
                {chosenList ? null : <EditVet email={email} petID={petID} setUpdate={(value)=>setUpdate(value)} />}
            </Box>
            
            {!vetExists ? null : <Box sx={{
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
            </Box>}
        </Box>
    </Fragment>
}