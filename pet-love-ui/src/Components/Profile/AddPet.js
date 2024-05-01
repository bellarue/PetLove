import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddVet from './AddVet';

export default function AddPet(props) {
    const {email} = props;
    const [nameInput, setNameInput] = useState('');
    const [typeInput, setTypeInput] = useState('');
    const [vetInput, setVetInput] = useState('');
    const [verifyVet, setVerifyVet] = useState(false);
    const [vets, setVets] = useState([]);
    const [vetAvail, setVetAvail] = useState(true);

    useEffect(() => {
        const api = new API();

        async function getVets() {
            const vetsJSONString = await api.vetsByUser(email);
            console.log(`vets from the DB ${JSON.stringify(vetsJSONString)}`);
            setVets(vetsJSONString.data.map(comp => comp.email));
        }

        getVets();
    }, []);

    useEffect(() => {
        if( !verifyVet ){
            return;
        }
        if( vetInput.length > 0 && !vets.includes(vetInput) ){ //vet can be left empty
            setVetAvail(false);
        }
        const api = new API();

        async function postPet() {
            const petUpdateResults = api.addPet({name: nameInput, type: typeInput, veterinarian: vetInput});
            console.log(`adding to pets ${JSON.stringify(petUpdateResults)}`);
        }

        postPet();
    }, [verifyVet]);

    const handleNameChange = event => {
        console.log("handleInputChange called.");
        setNameInput(event.target.value);
    };
    const handleTypeChange = event => {
        console.log("handleInputChange called.");
        setTypeInput(event.target.value);
    };

    const handleVetChange = event => {
        console.log("handleInputChange called.");
        setVetInput(event.target.value);
    };

    const display = () => {
        if( !vetAvail ){
            return <Fragment>
                <Typography>
                    New Vet, please add information
                </Typography>
                <AddVet email={email} />
            </Fragment>
        }
        return;
    }

    return <Fragment>
        <Box display="flex" flexDirection="column" alignItems="center" width={400} >
            <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" width="100%" mb={0.75}>
                <TextField
                    id="outlined-error-helper-text"
                    label="Pet Name"
                    placeholder=""
                    value={nameInput}
                    onChange={handleNameChange}
                />
                <TextField
                    id="outlined-error-helper-text"
                    label="Type"
                    placeholder=""
                    value={typeInput}
                    onChange={handleTypeChange}
                />
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" width="100%" mb={0.75}>
                <TextField
                    id="outlined-error-helper-text"
                    label="Veterinarian's Email"
                    placeholder=""
                    value={vetInput}
                    onChange={handleVetChange}
                />
            </Box>
            <Button
                variant="outlined"
                size="medium"
                onClick={() => {setVerifyVet(true)}}
            >Create</Button>
            {display()}
        </Box>
    </Fragment>
}