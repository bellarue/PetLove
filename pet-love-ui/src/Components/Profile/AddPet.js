import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import { Box, Button, TextField } from '@mui/material'
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddVet from './AddVet';

export default function AddPet(props) {
    const {email, setUpdatePets, setUpdateVets} = props;
    const [open, setOpen] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [typeInput, setTypeInput] = useState('');
    const [vetInput, setVetInput] = useState('');
    const [verifyVet, setVerifyVet] = useState(false);
    const [vets, setVets] = useState([]);
    const [vetNotAvail, setVetNotAvail] = useState(false);
    const [nameFailed, setNameFailed] = useState(false);
    const [typeFailed, setTypeFailed] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onAddClick = () => {
        setVerifyVet(true);
        return;
    }
    
    const handleNameChange = event => {
        console.log("handleInputChange called.");
        setNameInput(event.target.value);
        setNameFailed(false);
    };
    const handleTypeChange = event => {
        console.log("handleInputChange called.");
        setTypeInput(event.target.value);
        setTypeFailed(false);
    };

    const handleVetChange = event => {
        console.log("handleInputChange called.");
        setVetInput(event.target.value);
        setVetNotAvail(false);
    };
    const display = () => {
        if( vetNotAvail ){
            return <AddVet email={email} setVerifyVet={(value)=>setVerifyVet(value)} setUpdateVets={(value)=>setUpdateVets(value)} value={vetInput} />
        }
        return;
    }

    useEffect(() => {
        const api = new API();

        async function getVets() {
            const vetsJSONString = await api.vetsByUser(email);
            console.log(`vets from the DB ${JSON.stringify(vetsJSONString)}`);
            setVets(vetsJSONString.data.map(comp => comp.email));
        }

        getVets();
    }, [verifyVet]);

    useEffect(() => {
        if( !verifyVet ){
            return;
        }
        if( vetInput.length > 0 && !vets.includes(vetInput) ){ //vet can be left empty
            console.log(`vet not available, vetInput is ${vetInput} vets is ${JSON.stringify(vets)}`);
            setVetNotAvail(true);
            setVerifyVet(false);
            return;
        }
        const api = new API();
        let vet = vetInput;
        if( vet.length === 0 ){
            vet = null;
        }
        console.log(`name: ${nameInput}, type: ${typeInput}, veterinarian: ${vet}`);
        async function postPet() {
            const petUpdateResults = await api.addPet({name: nameInput, type: typeInput, veterinarian: vet});
            console.log(`adding to pets ${JSON.stringify(petUpdateResults)}`);
            console.log(`petID is ${petUpdateResults.data.insertId} user is ${email}`);
            const petParentUpdateResults = await api.addParent({user: email, pet: petUpdateResults.data.insertId });
            console.log(`adding to pet parents ${JSON.stringify(petParentUpdateResults)}`);
            setUpdatePets(true);
            setVerifyVet(false);
            setNameInput('');
            setTypeInput('');
            setVetInput('');
            setVetNotAvail(false);
        }

        postPet();
        handleClose();
    }, [verifyVet]);

    return (
        <div>
        <Button onClick={handleOpen}>
            <AddCircleIcon />
        </Button>
        <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
        >
            <ModalContent sx={{ width: 400 }}>
                <Fragment>
                    <Box display="flex" flexDirection="column" alignItems="center" width='100%' >
                        <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" width="100%" mb={0.75}>
                            <TextField
                                error={nameFailed}
                                id="outlined-error-helper-text"
                                label="Pet Name*"
                                placeholder=""
                                value={nameInput}
                                onChange={handleNameChange}
                            />
                            <TextField
                                error={typeFailed}
                                id="outlined-error-helper-text"
                                label="Type*"
                                placeholder=""
                                value={typeInput}
                                onChange={handleTypeChange}
                            />
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" width="100%" mb={0.75}>
                            <TextField
                                error={vetNotAvail}
                                id="outlined-error-helper-text"
                                label="Veterinarian's Email"
                                placeholder=""
                                value={vetInput}
                                onChange={handleVetChange}
                            />
                            {display()}
                        </Box>
                    </Box>
                    <Button onClick={onAddClick}>
                        Create
                        <AddIcon/>
                    </Button>
                </Fragment>
            </ModalContent>
        </Modal>
        </div>
    );
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);