import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddVet(props) {
    const {email} = props;
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [phoneNumInput, setPhoneNumInput] = useState('');
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [emailUsed, setEmailUsed] = useState(false);
    const [vets, setVets] = useState([]);

    useEffect(() => {
        const api = new API();

        async function getVets() {
            const vetsJSONString = await api.vetsByUser(email);
            console.log(`vets from the DB ${JSON.stringify(vetsJSONString)}`);
            setVets(vetsJSONString.data.map(comp => comp.email));
        }

        getVets();
    }, []);

    const handleNameChange = event => {
        console.log("handleInputChange called.");
        setNameInput(event.target.value);
    };
    const handleEmailChange = event => {
        console.log("handleInputChange called.");
        setEmailInput(event.target.value);
        setEmailUsed(false);
    };

    const handlePhoneNumChange = event => {
        console.log("handleInputChange called.");
        setPhoneNumInput(event.target.value);
    };

    useEffect(() => {
        if( !verifyEmail ){
            return;
        }
        if( vets.includes(emailInput) ){
            setEmailUsed(true);
        }
        const api = new API();

        async function postVet() {
            const vetUpdateResults = api.addVet({email: emailInput, name: nameInput, phone_num: phoneNumInput});
            console.log(`adding to vets ${JSON.stringify(vetUpdateResults)}`);
        }

        postVet();
    }, [verifyEmail]);

    return <Fragment>
        <Box display="flex" flexDirection="column" alignItems="center" width={400} mt={10}>
            <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" width="100%" mb={0.75}>
                <TextField
                    id="outlined-error-helper-text"
                    label="Name"
                    placeholder=""
                    value={nameInput}
                    onChange={handleNameChange}
                />
                <TextField
                    error={emailUsed}
                    id="outlined-error-helper-text"
                    label="Email"
                    placeholder=""
                    value={emailInput}
                    onChange={handleEmailChange}
                />
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" width="100%" mb={0.75}>
                <TextField
                    id="outlined-error-helper-text"
                    label="Phone Number"
                    placeholder=""
                    value={phoneNumInput}
                    onChange={handlePhoneNumChange}
                />
            </Box>
            <Button
                variant="outlined"
                size="medium"
                onClick={() => {setVerifyEmail(true)}}
            >Create</Button>
        </Box>
    </Fragment>
}